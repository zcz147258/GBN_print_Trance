import Vue from 'vue';
import Vuex from 'vuex';

//vuex模块引入
import Bluetooth from './modules/bluetooth.js';  //存储蓝牙设备信息
//vue使用vuex;
Vue.use(Vuex);

export default new Vuex.Store({
	// 开启严格模式,仅开发模式下启用,发布环境下取消
	strict: true,
    modules:{
	   Bluetooth
    }
})