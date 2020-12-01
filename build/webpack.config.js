const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: path.resolve(__dirname, '../es/ts.js'),
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'ts.js'
    },
    externals: {
        react: { // 脱离打包到bundle
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css|\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css-loader',
                      options: {
                        sourceMap: false
                      }
                    },
                    'postcss-loader',
                    {
                      loader: 'less-loader',
                      options: {
                        lessOptions: {
                            javascriptEnabled: true
                        },
                        sourceMap: true
                      }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}