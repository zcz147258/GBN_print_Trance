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

		<view class="bind-v" @click="doBind">溯源绑定(大码)</view>
	</view>
</template>

<script>
var barcode = null;
export default {
	data() {
		return {
			txts: []
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
			
			
			if(this.txts.length<2){
				uni.showToast({
					icon:'none',
				    title: '请扫描绑定信息',
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
			uni.request({
			    url: this.BaseRequestUrl + '/tracing/bindInfo',
				method:'POST',
			    data: {
			        txts:this.txts
			    },
			    success: (res) => {
					console.log(res)
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
