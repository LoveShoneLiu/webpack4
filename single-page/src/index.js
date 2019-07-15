import Vue from 'vue';
import './index.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './components/App/index.vue';


// 这样引入 vendors~main.js 765kb
import {
	Dialog,
	Button,
} from 'element-ui';
  
Vue.use(Button);
Vue.use(Dialog);



// 这样引入 vendors~main.js   1.85 MiB
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);

new Vue({
	render: h =>h(App)
}).$mount('#root');







