import Vue from 'vue'
import App from './app.vue'
import store from '@/store'
import router from './router'
import '@/plugins/element.js'
import '@/icons'
import commonPlugin from '@/components/common'
Vue.use(commonPlugin);
import '@/style/index.scss';

Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  render: h => h(App)
})

app.$mount('#app')
window.__indexVue__ = app;