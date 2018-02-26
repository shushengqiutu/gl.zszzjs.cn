
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './lib/http'

Vue.config.productionTip = false

Vue.use(ElementUI);

http.get({
  url: '/gl/admin/info'
}).then( data=>console.log(data) )

const ins = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

console.log(ins.$store)
console.log(ins.$store.commit)


