import Vue from 'vue';
import Vuex from 'vuex';
import './index.css';
import App from './components/App/index.vue';
import store from '@/pages/second/store/';

// Vuex
Vue.use(Vuex);

new Vue({
	store,
	render: h =>h(App)
}).$mount('#root');







