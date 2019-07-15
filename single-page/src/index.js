import Vue from 'vue';
import './index.css';
import App from './components/App/index.vue';
import { add } from './assets/js/math.js'; 


var test = 'liu shao fei';
console.log('test', test);

add(1, 2);

new Vue({
	render: h =>h(App)
}).$mount('#root');







