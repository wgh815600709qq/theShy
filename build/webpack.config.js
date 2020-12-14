const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: path.resolve(__dirname, '../es/ts.js'),
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'ts.js',
        publicPath: path.resolve(__dirname, '/devServer')
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
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer()]
                            }
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