import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import Toast from '@/components/common/Toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 安装插件
Vue.use(Toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyload, {
  loading: require('assets/img/common/loading.gif')
})

// runtime
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
