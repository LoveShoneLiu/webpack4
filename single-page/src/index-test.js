import vue from 'vue';
import './index-test.css';
import './index2-test.css';
console.log('vue', vue);

console.log('this', this);


// 同步
// import _ from 'lodash';
// var element = document.createElement('div');
// element.innerHTML = _.join(['liu', 'shaofe', 'fei'], '-');
// document.body.appendChild(element);



// // 异步
// function getComponent() {
//     // /* webpackChunkName: "lodash" */ 用来设置lodash打包的名字
//     return import(/* webpackChunkName: "lodash" */ 'lodash').then((({ default: _ }) => {
//         var element = document.createElement('div');
//         element.innerHTML = _.join(['liu', 'shaofe', 'fei'], '-');
//         return element;
//     }))
// }
// getComponent().then(element => {
//     document.body.appendChild(element);
// });



// 使用会让js打包变大，不使用会变小，因为polyfill实现了按需加载
// new Promise(() => {
//     console.log('promise');
// });

var html = document.getElementById('root');
root.innerHTML = '<div class="iconfont iconcai">test</div>';
console.log(2);
