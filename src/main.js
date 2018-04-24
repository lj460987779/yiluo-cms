import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
//import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import ls from './utils/localStorage.js';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
	const login_date = localStorage.getItem('login_date')
	const userInfo = localStorage.getItem('userInfo')
	let now = new Date();
	let now_time = now.getTime()
	let time_cha = now_time - login_date
	let expiredTime = 3600000
	if (to.path !== "/login") {
		if (!userInfo) {
			ElementUI.Message({
				message: '请登录',
				type: 'error',
				duration: 5 * 1000
			})
			next({
				path: '/login'
			})
		} else if (time_cha > expiredTime) {
			ElementUI.Message({
				message: '请重新登录',
				type: 'error',
				duration: 5 * 1000
			})
			next({
				path: '/login'
			})
		}else{
			next()
		}
	} else {
		next()
	}
})