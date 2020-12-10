// webpackdevServer
// const path = require('path');
const express = require('express');
const webpack = require('webpack');

const webpackConfig = require('./webpack.dev.config');

const app = express();
const compiler = webpack(webpackConfig);
const { createRouterFile } = require('../tools/dynamicRoute.tool');
// 动态路由
createRouterFile();
// 端口
const port = 8081

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, { log: () => { } })

// html5 router
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

const uri = `http://localhost:${port}`

devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at ${uri} \n`)
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})