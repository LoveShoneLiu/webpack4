const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

const config = {
    mode: "development",

    /**
     * sourcemap的作用：当代码出错的时候，sourcemap用来指向（映像）出错的代码
     * devtool: 'cheap-module-eval-source-map',  // 开发环境使用,性价比高
     * devtool: 'cheap-module-source-map',  // 线上环境使用，性价比高， 线上不需要使用sourceMap，但是如果也想在线上出错的时候提示具体错误，可以使用这个
    */
    devtool: 'cheap-module-eval-source-map',  // 开发环境使用
    devServer: {
        publicPath: '/', 
        contentBase: '/dist',  // devserver的根目录
        open: true, // 会自动帮你打开浏览器
        // proxy: '', // 用来做跨域接口代理
        port: '9999', // 指定默认端口号
        hot: true,
        // hotOnly: true   // 如果不设置，html出错的时候会刷新页面，设置为true，html出错也不会刷新页面
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|less)/,
                use: [
                    'vue-style-loader',
                    'style-loader',
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
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = merge(commonConfig, config);