const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

const config = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',  // 开发环境使用
    // devtool: 'cheap-module-source-map', // 线上不需要使用sourceMap，但是如果也想在线上出错的时候提示具体错误，可以使用这个
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
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // modules: true
                        }
                    },
                    'postcss-loader']
            },
        ]
    },
    resolve: {
        alias: {
            jspath: path.resolve(__dirname, '../src/js/'),
            csspath: path.resolve(__dirname, '../src/css/'),
            rootPath: path.resolve(__dirname, '../src/'),
            componentsPath: path.resolve(__dirname, '../src/components/'),
        },
        extensions: ['.js', '.vue', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig, config);