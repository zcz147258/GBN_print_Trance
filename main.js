import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import '@/common/bluetooth.js';
//全局数据状态管理 vuex
import store from '@/store/index.js';
Vue.prototype.$store = store;
//全局公用静态数据
import Mock from '@/common/mock/index.js';
Vue.prototype.$Mock = Mock;

import Mock2 from '@/common/mock/index2.js';
Vue.prototype.$Mock2 = Mock2;

// Vue.prototype.BaseRequestUrl = 'http://wang-dai-gang.51vip.biz';
Vue.prototype.BaseRequestUrl = 'https://appservice.gbn.red'
App.mpType = 'app'

Vue.prototype.connectDevice = null

const app = new Vue({
    ...App
})
app.$mount()
