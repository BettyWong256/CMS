import Vue from 'vue'
import axios from 'axios';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/index.scss';
import App from './App.vue'
import router from './router'
import store from './store'

// 响应拦截
axios.interceptors.response.use((response) => {
  if(response.data.status == -1){
    ElementUI.Message.error(response.data.message);
    return Promise.reject({
      status: 200,
      error: String(response.statusText),
      errno: 0
    });
  } else {
    return response.data;
  }
}, (error) => {
  ElementUI.Message.error(error.response.data.message);
  return Promise.reject({
    status: error.response.status,
    errno: 0,
    error: error.response.data.message
  });
});

Vue.config.productionTip = false
Vue.prototype.$ajax = axios;
Vue.prototype.$Base = 'https://easy-mock.com/mock/5d37b66a4b33ce4d0693fc5a/cms';

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
