import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import './index.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './components/App/index.vue';
import store from '@/store/';
import routes from '@/router';

// router
Vue.use(VueRouter);
const router = new VueRouter({
	routes
});

// Vuex
Vue.use(Vuex);

// 按需引入组件，减少element-ui大小
import {
	Dialog,
	Button,
	Loading,
	MessageBox,
	Message,
	Notification
} from 'element-ui';
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
	store,
	router,
	render: h =>h(App)
}).$mount('#root');







