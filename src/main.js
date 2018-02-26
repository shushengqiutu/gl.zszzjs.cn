
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './lib/http'

Vue.config.productionTip = false

Vue.use(ElementUI);

http.init()

http.get({
  url: '/gl/admin/info1'
}).then( data=>console.log(data) )
  .catch(e=>console.log(e.message))

const ins = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


