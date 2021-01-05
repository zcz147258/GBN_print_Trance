<template>
	<view class="content">
		<view class="c">
			<view style="text-align: center;color: #007AFF;">【扫描信息】</view>
			<view>
				扫描数量：{{ txts.length }}
				<text @click="doClear" class="clear-v">清空</text>
			</view>
			<view class="txts-v">
				<view v-for="(item, index) in txts" :key="index">
					<text>序号{{ index + 1 }}:{{item.substring(item.indexOf('=')+1)}}</text>
				</view> 
			</view>
		</view>

		<view class="bind-v" @click="doBind">查找大码并且打印</view>
	</view>
</template>

<script>
var barcode = null;
export default {
	data() {
		return {
			txts: [],
			order_data_parent:{
				CUSTOMER_CODE: "GBN",
				CUSTOMER_CODE1: "产品溯源码",
				CUSTOMER_CODE2: "(母码)",
				BILL_CODE:"",
				id:2
			},
		};
	},
	onLoad() {
		let that = this;
		// #ifdef APP-PLUS
		const currentWebview = this.$mp.page.$getAppWebview(); //注意相关操作写在APP-PLUS条件编译下
		//#endif
		var barcode = plus.barcode.create('barcode', [0, 10], {
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
	},
	methods: {
		doClear() {
			this.txts = [];
		},
		doBind() {
			
			
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
			uni.showLoading({
			    title: '绑定中...'
			});
			let that = this;
			console.log(this.txts[0])
			uni.request({
			    url: 'http://wang-dai-gang.51vip.biz/tracing/getBigCodeBySmallCode?smallCode='+this.txts[0],
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
					uni.showToast({
					    title: msg,
					    duration: 2000
					});
					//开始打印
					// _this.info = res.data.data
					// let obj = JSON.parse(JSON.stringify(_this.order_data_parent));
					// obj.BILL_CODE = _this.info
					// print.startPrint(obj);
					// this.control = true
					//
					that.txts = [];
			    },complete() {
			    	setTimeout(function () {
			    	    uni.hideLoading();
			    	}, 1000);
			    }
			});
			
		}
	}
};
</script>

<style>
.c {
	position: absolute;
	top: 650rpx;
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
</style>
