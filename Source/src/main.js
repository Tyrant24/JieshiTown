// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wx from "weixin-jsapi"; 
import 'lib-flexible/flexible.js';
import echarts from 'echarts';
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';

import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
 
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.use(VueVideoPlayer);
 
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.wx = wx
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


