// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/fonts/iconfont.css'
import router from './router'
import './assets/styles/base.less'
import './assets/styles/layout.less'
import api from './api'
Vue.use(api)
Vue.use(MintUI)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import Refresh from '@/components/loading/refresh'
Vue.component('refresh', Refresh)

import Infinite from '@/components/loading/infinite'
Vue.component('infinite', Infinite)

import * as filters from './utils/filter'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
