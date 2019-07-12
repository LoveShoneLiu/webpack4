const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    externals: ["lodash"],  // 自己引入了lodash，用我们库的用户也引入了lodash，这样就造成了重复，这样设置之后打包之后就不会把lodash打包进js，用户在使用的时候需要自己引入一下lodash import lodash from 'lodash'
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'library.js',
        library: 'library',     // <script src="library.js"></script>引入，也是可以使用
        libraryTarget: 'umd',   // 不管是es6的import引入，还是require()引入，都是通用的
        // libraryTarget: 'this',   //  如果这么设置，会把library挂载到this上
    }
}