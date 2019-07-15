const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
console.log('__dirname__dirname__dirname__dirname', __dirname);

module.exports = {
    entry: {
        "main": path.resolve(__dirname, '../src/index.js')
    },
    output: {
        publicPath: '/',   // 指定资源基础路径
        path: path.resolve(__dirname, '../dist'),
        // filename: '[name]_[hash:8].js', // 业务代码加hash值
        filename: '[name]_[hash:8].js', // 业务代码加hash值, contenthash:文件代码不改，contenthash也不会变
        chunkFilename: '[name].js'  // 公共文件不加hash值，例如vendors~lodash.js和vendors~main.js
    },
    resolve: {
        alias: {
            // jspath: path.resolve(__dirname, '../src/js/'),
            // csspath: path.resolve(__dirname, '../src/css/'),
            // rootPath: path.resolve(__dirname, '../src/'),
            // componentsPath: path.resolve(__dirname, '../src/components/'),

            // npm默认安装vue“运行时”版本，加入下面代码，则使用编译+运行时版本，如果只使用“运行时”版本，则不能使用template，只能使用render函数
            // vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            extractCSS: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',  // babel-loader是webpack和babel做通信的桥梁，并不会打包代码
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env", // preset-env会把es6的代码打包成es5的代码，只是翻译了一部分，还有一些es6的功能不能通过preset-env翻译，所以需要polyfill帮助
                                    {
                                        // targets: {
                                        //     chrome: "<67"   // 小于67的版本才会进行es6转es5 打包
                                        // },
                                        useBuiltIns: "usage",    // 这样设置，在做polyfill做代码填充的时候，不是所有的垫片都会加载进去，如果我只用到了promise那么只填充promise的垫片，其他的不会填充，这样js就不会那么大了
                                    }
                                ]
                            ],
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import",  // 使用import()

                                // element-ui按需加载
                                [
                                    "component",
                                    {
                                      "libraryName": "element-ui",
                                      "styleLibraryName": "theme-chalk"
                                    }
                                ]
                            ]

                            // 业务开发的时候上面的presets设置就可以了，如果要开发是一个库代码，这个时候要用 plugin-transform-runtime和@babel/runtime，因为他们会闭包形式注入，防止污染全局环境
                            // 如果使用这种方式 上面的presets就可以不要了
                            // "plugins": [
                            //     [
                            //         "@babel/plugin-transform-runtime",
                            //         {
                            //             "absoluteRuntime": false,
                            //             "corejs": false,
                            //             "helpers": true,
                            //             "regenerator": true,
                            //             "useESModules": false
                            //         }
                            //     ]
                            // ]
                        }
                    },
                    // 'imports-loader?this=window'    // 设置页面的this默认指向window
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'images/',
                        limit: 1024
                    }
                }
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'font/'
                    }
                }
            },
        ]    
    },
    optimization: {
        splitChunks: {
            chunks: 'all',   // 自动帮你做代码分割, async: 只对异步代码生效 all: 同步异步都做代码分割，除了chunks: "all"其他的不配置，会使用默认项，可以在官网看到默认项
            // cacheGroups: {
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10,
            //         // filename: "vendors.js"
            //     },
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true
            //     }
            // }
        },
        usedExports: true,   // tree shaking  引入的打包，没引入的不打包
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),

        // // shimming（垫片）
        // new webpack.ProvidePlugin({
        //     $: 'jquery', // 如果发现文件当中使用了$，就会自动帮我们引入jquery，就不需要每个文件都import $ from 'jquery'
        //     _: 'lodash',
        //     _join: ['lodsh', 'join'],    // 如果在文件中使用_join，就会默认知道是lodash的join方法
        // })
    ]
}