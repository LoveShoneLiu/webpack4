const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/*
 * dev环境不支持热更新，所以只在线上环境使用mini-css-extract-plugin，dev环境仍然使用css in js的模式（也就是，html没有引入css，css是在js文件里面，js动态把css插入到html的header的style里面）
 * 为什么使用mini-css-extract-plugin：
 * 使用该loader之后，css会被打包成单独的css文件，这样css和js可以实现并行加载
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// OptimizeCSSAssetsPlugin用来压缩MiniCssExtractPlugin处理过的css代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    mode: "production",
    // devtool: 'cheap-module-eval-source-map',  // 开发环境使用,使用这个打包的vendors会很大，680kn左右
    // devtool: 'cheap-module-source-map', // 线上不需要使用sourceMap，但是如果也想在线上出错的时候提示具体错误，可以使用这个，但是也会让vendors变大，不使用会更小
    optimization: {
        minimizer: [

            // 压缩css代码
            new OptimizeCSSAssetsPlugin({}),

            // 压缩js代码
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|less)/,
                use: [
                    MiniCssExtractPlugin.loader,    // dev使用的style-loader，不一样的配置
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // modules: true
                        }
                    },
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[hash:8].css', // 直接被页面引入的，会走filename
            chunkFilename: '[name]_[hash:8].chunk.css'   // 如果间接的被引入，会走chunkFilename
        })
    ],
}

module.exports = merge(commonConfig, config);