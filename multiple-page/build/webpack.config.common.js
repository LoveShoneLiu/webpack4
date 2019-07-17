const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const cwd = process.cwd();
const srcPath = path.resolve(cwd, 'src');
const pagesPath = path.resolve(srcPath, 'pages');
const glob = require('glob');
const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

const resources = (() => {
    let entries = {};
    let outputs = {};
    let htmls = [];
    let itemPath = [];
    const directories = glob.sync('*/', {
        cwd: pagesPath
    });
    directories.forEach((dir, index) => {

        // 返回的是数组
        let getHtml = glob.sync(dir + '*.html', {
            cwd: pagesPath
        });
        htmls = htmls.concat(getHtml);
        // console.log('resultresultresultresult', htmls);

        const jsList = glob.sync(dir + '*.js', {
            cwd: pagesPath
        });

        jsList.forEach((jsfile) => {
            const jsName = jsfile.split('/')[0];
            if (!Array.isArray(entries[jsName])) {
                entries[jsName] = [`${pagesPath}/${jsfile}`];
            } else {
                entries[jsName].push(`${pagesPath}/${jsfile}`);
            }
        });
    });

    return {
        htmls,
        entries
    }

})();

const {
    entries,
    htmls
} = resources;

const getPlugins = (() => {
    const htmlWebpackPlugins = [];
    htmls.forEach((html, index) => {
        const pageName = html.split('/')[0];
        let result = path.resolve(__dirname, '../src/pages/', html);
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/pages/', html),
                filename: `${pageName}.html`,
                chunks: [`${pageName}`, 'vendors']
            })
        );
    });
    return {
        htmlWebpackPlugins
    }
})();

const {
    htmlWebpackPlugins
} = getPlugins;

const commonConfig = {
    entry: entries,
    output: {
        publicPath: '/',   // 指定资源基础路径
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]_[hash:8].js', // 业务代码加hash值, contenthash:文件代码不改，contenthash也不会变
        chunkFilename: 'js/[name]_[hash:8].js'  // 公共文件不加hash值，例如vendors~lodash.js和vendors~main.js
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/'),
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
                                        "corejs": "3",
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
                        }
                    }
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
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: '[name].js',
                    chunks: 'all',
                    name: 'vendors'
                }
            }
        },
        usedExports: true,   // tree shaking  引入的打包，没引入的不打包
    },
    plugins: [
        new VueLoaderPlugin(),
        ...htmlWebpackPlugins
    ]
}

module.exports = {
    resources,
    commonConfig
}