import {SET_INFODATA,SET_CONNECTBLEDATA,SET_CONNECTPRINTBLE} from '@/store/actionsType.js';
import {GET_CONNECTBLEDATA,GET_INFODATA,GET_CONNECTRINTDATA} from '@/store/gettersType.js';
const state = {
	BLEInfoData:[],  //存储蓝牙列表
	connectBLEData:[], //存储已链接蓝牙列表
	connectPrintBLE:{}   //存储已连接打印机蓝牙,存入缓存
}
const mutations = {
	[SET_INFODATA](state,value){
		if(value instanceof Array){
			state.BLEInfoData = value;
		}else{
			state.BLEInfoData.push(value);
		}
	},
	[SET_CONNECTBLEDATA](state,value){
		if(value instanceof Array){
			state.connectBLEData = value;
		}else{
			state.connectBLEData.push(value);
		}
	},
	[SET_CONNECTPRINTBLE](state,value){
		state.connectPrintBLE = value;
	}
}
const actions = {
	[SET_INFODATA]({commit},value){
		commit(SET_INFODATA,value);
	},
	[SET_CONNECTBLEDATA]({commit},value){
		commit(SET_CONNECTBLEDATA,value);
	},
	[SET_CONNECTPRINTBLE]({commit},value){
		commit(SET_CONNECTPRINTBLE,value);
	}
}
const getters = {
	[GET_CONNECTBLEDATA]:(state)=>{
		return state.connectBLEData;
	},
	[GET_INFODATA]:(state)=>{
		return state.BLEInfoData;
	},
	[GET_CONNECTRINTDATA]:(state)=>{
		return state.connectPrintBLE
	}
}
export default{
	state,
	getters,
	actions,
	mutations
};
