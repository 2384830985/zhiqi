// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Axios from 'axios'
import store from './store/store'
import Vfilters from './filters/filters.js'
import 'element-ui/lib/theme-chalk/index.css'
import Jump from './utils/Jump.js'
for (let key in Vfilters) {
	Vue.filter(key,Vfilters[key])
}
Vue.prototype.$http = Axios

Vue.prototype.Jump = Jump // 公共跳转方法

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
