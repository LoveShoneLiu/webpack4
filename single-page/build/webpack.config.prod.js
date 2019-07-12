const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const config = {
    mode: "production",
    devtool: 'cheap-module-eval-source-map',  // 开发环境使用
    // devtool: 'cheap-module-source-map', // 线上不需要使用sourceMap，但是如果也想在线上出错的时候提示具体错误，可以使用这个
    resolve: {
        alias: {
            jspath: path.resolve(__dirname, '../src/js/'),
            csspath: path.resolve(__dirname, '../src/css/'),
            rootPath: path.resolve(__dirname, '../src/'),
            componentsPath: path.resolve(__dirname, '../src/components/'),
        },
        extensions: ['.js', '.vue', '.json']
    },
    optimization: {
        // usedExports: true, // tree shaking mode是production的情况，不需要设置usedExports，因为已经自动帮我们配置好了，
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
}

module.exports = merge(commonConfig, config);