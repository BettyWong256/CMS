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
  if (response.status == 200) {
      return response.data;
  } else {
    ElementUI.Message.error(String(response.statusText));
    return Promise.reject({
      status: 200,
      error: String(response.statusText),
      errno: 0
    });
  }
}, (error) => {
  ElementUI.Message.error(String(error));
  return Promise.reject({
    status: error.response.status,
    errno: 0,
    error: String(error)
  });
});

Vue.config.productionTip = false
Vue.prototype.$ajax = axios;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
