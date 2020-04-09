import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'

import './style.css'

Vue.config.productionTip = false

// 引用axios，加载到Vue原型上
Vue.prototype.$http = http

//注意，一定要在new Vue()之前
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
