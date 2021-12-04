import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { deleteRequest, getRequest, postRequest, putRequest } from "./utils/api";

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('palyFormat', count=>{
     if(count>10000){
         count = parseInt(count / 10000)
     }

     return count+'万'
});
