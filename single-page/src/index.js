import vue from 'vue';
// console.log('vue', vue);

console.log('this', this);


// 同步
// import _ from 'lodash';
// var element = document.createElement('div');
// element.innerHTML = _.join(['liu', 'shaofe', 'fei'], '-');
// document.body.appendChild(element);



// 异步
function getComponent() {
    // /* webpackChunkName: "lodash" */ 用来设置lodash打包的名字
    return import(/* webpackChunkName: "lodash" */ 'lodash').then((({ default: _ }) => {
        var element = document.createElement('div');
        element.innerHTML = _.join(['liu', 'shaofe', 'fei'], '-');
        return element;
    }))
}
getComponent().then(element => {
    document.body.appendChild(element);
});




new Promise(() => {
    console.log('promise');
});

var html = document.getElementById('root');
import './index.css';
root.innerHTML = '<div class="iconfont iconcai">test</div>';
console.log(2);
