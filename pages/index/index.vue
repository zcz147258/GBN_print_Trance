<template>
	<view class="content">
		<view>
			<!-- <view class="bluetoothConnected">
				<view class="bluetoothList" v-for="(item,index) in GET_CONNECTBLEDATA" :key="index" @tap="confirm_bluetooth(item)">
					<view class="bluetoothList-name">名称:{{item.name}}</view>
					<view class="bluetoothList-mac">地址:{{item.mac}}</view>
				</view>
			</view> -->
			<button type="primary" @click="search_bluetooth">搜索打印机</button>
			<view class="bluetoothItem" v-if="GET_INFODATA">
				<view style="font-size: 30rpx;color: #555555;text-align: center;">
					已搜索到的打印机列表：(点击连接)
				</view>
				<view class="bluetoothList"  v-if="filter(item)"  v-for="(item,index) in GET_INFODATA"
				 :key="index"
				 @tap="confirm_bluetooth(item)"
				 style="text-align: center;">
					 <view class="bluetoothList-name">名称:{{item.name}}</view>
					 <view class="bluetoothList-mac">地址:{{item.mac}}</view>
				</view>
			</view>
			<view class="uni-list">
				<!-- <radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" style="display: flex;justify-content: center;margin-top: 20rpx;" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group> -->
				
				<uni-list-item v-for="(item, index) in items" :key="item.value" @click="clickItem(index)"  :rightText="chooseindex == index?'已选中':''" :title="item.name"  />
			</view>
			<button type="warn" @click="senBleLabel"  :disabled="!control" style="position: fixed;bottom: 20rpx;width: 700rpx;margin-left: 25rpx;">打印</button>
		</view>
		
		<uni-popup ref="popup" :maskClick="false">
			<view class="popupBox">
				<view class="container">
					<view style="text-align: center;font-size: 35rpx;padding-top: 10rpx;">提示</view>
					<view style="padding-bottom: 20rpx;background-color: white;">
						<input type="number" :focus="true" class="input" v-model="printNum" style="color: black;font-size: 35rpx;" placeholder="请输入打印数量(1-20)" >
					</view>
					<view style="width: 100%;background-color: white;padding-bottom: 20rpx;">
						<button type="primary"  @click="submitNumber" style="width: 200rpx;height: 100%; border: none;outline: none;" >确认</button>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popupCreateSmallBybig" class="popupCreateSmallBybig" :maskClick="false">
			<view class="content">
				<view class="c">
					<view style="text-align: center;color: #007AFF;">【扫描信息】</view>
					<view>
						扫描数量：{{ txts.length }}
						<text @click="close(1)" style="background-color: red;" class="clear-v">关闭</text>
						<text @click="doClear"  class="clear-v">清空</text>
					</view>
					<view class="txts-v">
						<view v-for="(item, index) in txts" :key="index">
							<text>序号{{ index + 1 }}:{{item.substring(item.indexOf('=')+1)}}</text>
						</view> 
					</view>
				</view>
			
				<view class="bind-v" @click="doBind">扫描大码并且打印小码</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popupCreateBigBySmall" class="popupCreateSmallBybig" :maskClick="false">
			<view class="content">
				<view>关闭</view>
				<view class="c">
					<view style="text-align: center;color: #007AFF;">【扫描信息】</view>
					<view>
						扫描数量：{{ txts.length }}
						<text @click="close(2)" style="background-color: red;" class="clear-v">关闭</text>
						<text @click="doClear" class="clear-v">清空</text>
					</view>
					<view class="txts-v">
						<view v-for="(item, index) in txts" :key="index">
							<text>序号{{ index + 1 }}:{{item.substring(item.indexOf('=')+1)}}</text>
						</view> 
					</view>
				</view>
			
				<view class="bind-v" @click="doBind1">扫描小码获取大码</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var barcode = null;
	var currentWebview = null
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import printConnect from "@/common/print.js";  //引入打印机模板文件 
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	let _this = null;
	let that = this
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	import {
		GET_INFODATA,
		GET_CONNECTBLEDATA
	} from "@/store/gettersType.js";
	import {
		SET_CONNECTBLEDATA
	} from '@/store/actionsType.js';
	let print;
	export default {
		data() {
			return {
				txts:[],
				chooseindex:0,
				printNum:'',//打印数量
				 items: [{
						value: 'small',
						name: '少量打印小码(默认旧版)'
					},
					{
						value: 'bigger',
						name: '打印大码(新增)',
					},
					{
						value: 'search',
						name: '根据小码查询大码并且打印'
					},
					{
						value: 'bigger',
						name: '根据大码打印小码(新增)',
					},
					{
						value: 'bigger',
						name: '溯源码绑定',
					},
				],
				current: 0,
				bArray: [], //用于搜索蓝牙去重用的
				no_match_list: [], //没有配对的蓝牙列表
				match_list: "", //已连接蓝牙打印机
				val: "",
				dateTimer: "",
				valArr: [],
				// 巴枪参数
				broadcase_actions: "com.android.receive_scan_action",
				broadcast_flag: "data",
				info:[],
				order_data_parent:{
					CUSTOMER_CODE: "GBN",
					CUSTOMER_CODE1: "产品溯源码",
					CUSTOMER_CODE2: "(母码)",
					BILL_CODE:"",
					id:2
				},
				order_data:{
					CUSTOMER_CODE: "GBN",
					CUSTOMER_CODE1: "产品溯源码",
					BILL_CODE:"",
					id:1
				},
				control:true
			};
		},
		computed: {
			...mapGetters([GET_INFODATA, GET_CONNECTBLEDATA])
		},
		onShow() {
			uni.hideLoading();
			//检查是否已连接蓝牙
			this.$check_bluetooth_connect();
			console.log('onShow');
		},
		onHide() {
			console.log('onHide');
		},
		onUnload() {
			console.log('onUnload');
		},
		onLoad(options) {
			_this = this;
			 this.$init_bluetooth();
			 
		},
		methods: {
			...mapActions([SET_CONNECTBLEDATA]),
			
			close(index){
				if(index == 1){
					this.$refs.popupCreateSmallBybig.close()
					this.txts = []
					barcode.cancel()
					barcode.close()
				}else{
					this.$refs.popupCreateBigBySmall.close()
					this.txts = []
					barcode.cancel()
					barcode.close()
				}
			},
			doClear() {
				this.txts = [];
			},
			doBind1(){//根据小码获取大码
				if(this.txts.length<1){
					uni.showToast({
						icon:'none',
					    title: '请扫描小码信息',
					    duration: 2000
					});
					return;
				}
				//数据格式化
				for (let i = 0; i < this.txts.length; i++) {
					this.txts[i] = this.txts[i].substring(this.txts[i].indexOf('=')+1);
					this.txts[i] = this.txts[i].replace("\r\n", "")
				}
				// uni.showLoading({
				//     title: '绑定中...'
				// });
				let that = this;
				console.log(this.txts[0])
				uni.request({
				    url: this.BaseRequestUrl + '/tracing/getBigCodeBySmallCode?smallCode='+this.txts[0],
					method:'GET',
				    success: (res) => {
						console.log(res.data)
				       let code = res.data.code;
					   let msg = res.data.msg;
						if(code == 500){
							uni.showToast({
								icon:'none',
							    title: msg,
							    duration: 2000
							});
							return;
						}
						// uni.showToast({
						//     title: msg,
						//     duration: 2000
						// });
						//开始打印
						_this.info = res.data.data
						let obj = JSON.parse(JSON.stringify(_this.order_data_parent));
						obj.BILL_CODE = _this.info
						print.startPrint(obj);
						
						that.txts = [];
				    },complete() {
				    	setTimeout(function () {
				    	    uni.hideLoading();
				    	}, 1000);
				    }
				});
			},
			doBind() {//根据大码打印小码
				if(this.txts.length<1){
					uni.showToast({
						icon:'none',
					    title: '请扫描大码信息',
					    duration: 2000
					});
					return;
				}
				//数据格式化
				for (let i = 0; i < this.txts.length; i++) {
					this.txts[i] = this.txts[i].substring(this.txts[i].indexOf('=')+1);
					this.txts[i] = this.txts[i].replace("\r\n", "")
				}
				uni.request({
				    url: this.BaseRequestUrl + '/tracing/createSmallCodeInfo',
					method:'POST',
					data:{
						bigCode: this.txts[0],
						num:this.printNum,
						pwd:"gbnsym2020-createSmallCodeInfo"
					},
				    success: (res) => {
						console.log(res.data)
						let _this = this
				       let code = res.data.code;
					   let msg = res.data.msg;
						if(code == 500){
							uni.showToast({
								icon:'none',
							    title: msg,
							    duration: 2000
							});
							return;
						}
						_this.info = res.data.data
						_this.info.forEach(item=>{
							let obj = JSON.parse(JSON.stringify(_this.order_data));
							obj.BILL_CODE = item
							print.startPrint(obj);
							// print.startPrint(_this.order_data);
						})
						that.txts = [];
						
				    },complete() {
				    	setTimeout(function () {
				    	    uni.hideLoading();
				    	}, 1000);
				    }
				});
			},
			clickItem(index){
				this.chooseindex = index
				if(index == 0){
				}else if(index == 1){//打印大码
					
				}else if(index ==2){//根据小码生成大码
					// uni.navigateTo({
					// 	url:'../parent/parent'
					// })
					this.$refs.popupCreateBigBySmall.open()
					let that = this;
					// #ifdef APP-PLUS
					currentWebview = this.$mp.page.$getAppWebview(); //注意相关操作写在APP-PLUS条件编译下
					//#endif
					barcode = plus.barcode.create('barcode', [0, 10], {
						top: '0',
						left: '40px',
						width: '300px',
						height: '300px',
						position: 'static'
					});
					// #ifdef APP-PLUS
					barcode.onmarked = function(type, result) {
						
						if(that.txts.indexOf(result)==-1){
							that.txts.push(result);
						}
						// setTimeout(function() {
						barcode.start();
						// }, 1);
					};
					//#endif
					// 此处未演示扫码成功回调的地址设置，实际请参考HTML5Plus API自行处理
					// 注意扫码区域需为正方形，否则影响扫码识别率
					currentWebview.append(barcode);
					barcode.start();
				}else if(index == 3){//根据大码打印大码
					// uni.navigateTo({
					// 	url:'../printSmallByBig/printSmallByBig'
					// })
					this.$refs.popup.open()
					
				}else if(index == 4){
					uni.navigateTo({
						url:'../bind/bind'
					})
				}
			},
			submitNumber(){
				
				if(this.printNum != ''){
					if(this.printNum >= 1 && this.printNum <= 20){
						this.$refs.popup.close()
						this.$refs.popupCreateSmallBybig.open()
						let that = this;
						// #ifdef APP-PLUS
						currentWebview = this.$mp.page.$getAppWebview(); //注意相关操作写在APP-PLUS条件编译下
						//#endif
						barcode = plus.barcode.create('barcode', [0, 10], {
							top: '0',
							left: '40px',
							width: '300px',
							height: '300px',
							position: 'static'
						});
						// #ifdef APP-PLUS
						barcode.onmarked = function(type, result) {
							
							if(that.txts.indexOf(result)==-1){
								that.txts.push(result);
							}
							// setTimeout(function() {
							barcode.start();
							// }, 1);
						};
						//#endif
						// 此处未演示扫码成功回调的地址设置，实际请参考HTML5Plus API自行处理
						// 注意扫码区域需为正方形，否则影响扫码识别率
						currentWebview.append(barcode);
						barcode.start();
						
					}else{
						uni.showToast({
							icon:'none',
							mask:true,
							title:'请输入适当的数量'
						})
					}
					
				}else{
					uni.showToast({
						icon:'none',
						mask:true,
						title:'请输入打印数量'
					})
				}
			},
			focus(){
				console.log('dasda')
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						console.log(this.current)
						break;
					}
				}
			},
			getdata(){
				
			},
			filter(item){
				if((item.name.indexOf("HM") != -1) || (item.name.indexOf("V8") != -1) ){
					if(item.mac.indexOf("FC") != -1){
						return true
					}else{
						return false
					}
				}
				return false
			},
			senBleLabel() {
				//打印逻辑
				if(this.control){
					this.control = false
					let _this = this
					if(this.chooseindex == 0){//少量打印
						this.smallPrint()
					}else if(this.chooseindex == 1){//大码
						this.bigPrint()
					}
					// else if(this.current == 2){//查询母码
					// 	this.queryParentCode()
					// }
				}
			},
			bigPrint(){
				//打印母码
				uni.request({
					// url:'http://wang-dai-gang.51vip.biz/tracing/createInfo',
					url: this.BaseRequestUrl + '/tracing/createBigCodeInfo',
					method:"POST",
					data:{
						pwd:'gbnsym2020-123'
					},
					success: (res) => {
						_this.info = res.data.data
						let obj = JSON.parse(JSON.stringify(_this.order_data_parent));
						obj.BILL_CODE = _this.info
						print.startPrint(obj);
						this.control = true
					},
					fail: (err) => {
						uni.showToast({
							icon:'none',
							title:'请求出错'
						})
					}
				})
			},
			smallPrint(){
				
				uni.request({
					url: this.BaseRequestUrl + '/tracing/createInfo',
					// url:'https://appservice.gbn.red/tracing/createInfo',
					method:"POST",
					data:{
						pwd:'gbnsym2020-123'
					},
					success: (res) => {
						_this.info = res.data.data
						_this.info.forEach(item=>{
							let obj = JSON.parse(JSON.stringify(_this.order_data));
							obj.BILL_CODE = item
							print.startPrint(obj);
							// print.startPrint(_this.order_data);
						})
						this.control = true
					},
					fail: (err) => {
						uni.showToast({
							icon:'none',
							title:'请求出错'
						})
					}
				})
			},
			// 连接打印机
			confirm_bluetooth(item) {
				let {
					name,
					mac
				} = item;
				//判断蓝牙是否打开
				this.$check_bluetooth_open().then(res => {
					console.log(res);
					//进行打印机连接
					if (res) {
	                    print =new printConnect(item);  //打印机连接
						console.log(print)
						this.connectDevice = print
						console.log(this.connectDevice)
					}
				})
			},
			//搜索没匹配的蓝牙设备
			search_bluetooth(address) {
				let _this = this;
				//检查蓝牙是否开启
				this.$check_bluetooth_open().then(ores => {
					if (ores) {
						console.log(ores);
						//搜索蓝牙
						_this.$search_bluetooth().then(bres => {
							console.log(bres);
							if (bres.code) {
								_this.$search_pipei().then(pres => {
									console.log(pres);
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.popupCreateSmallBybig{
		position: absolute;
		top: 0;
		width: 750rpx;
		height: 100%;
		background-color: #eeeeee;
		z-index: 998;
		.c {
			position: absolute;
			top: 50rpx;
			left: -250rpx;
		}
		.clear-v {
			margin-left: 20rpx;
			float: right;
			background-color: #007aff;
			color: #fff;
			border-radius: 10rpx;
			padding: 5upx 10rpx;
			font-size: 30upx;
			margin-bottom: 10upx;
		}
		.txts-v {
			height: 270rpx !important;
			width: 500rpx !important;
			border: 1rpx solid #f0ad4e;
			padding: 20rpx;
			overflow-y: scroll;
			font-size: 30rpx;
		}
		
		.bind-v {
			position: fixed;
			bottom: 20rpx;
			border-radius: 10rpx;
			padding: 20rpx;
			width: 400rpx;
			text-align: center;
			background-color: #007aff;
			color: #fff;
		}
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
	.input {
		margin: 30upx 50upx 30upx 50upx;
		padding: 20upx;
		border: 1px solid #707070;
		border-radius: 50upx;
	}
	.popupBox{
		position: absolute;
		top: 0;
		width: 750rpx;
		height: 100%;
		background-color: #333333;
		z-index: 999;
		.container{
			border-radius: 14rpx;
			position: absolute;
			top: 30%;
			width: 80%;
			height: 200rpx;
			transform: translate(-50%,-50%);
			background-color: #f8f8f8;
			z-index: 999;
		}
	}
	
</style>
