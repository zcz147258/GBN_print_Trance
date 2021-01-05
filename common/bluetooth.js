import Vue from 'vue';
let main, Context, BManager, BluetoothAdapter, BAdapter, BluetoothDevice, IntentFilter;
import {SET_INFODATA,SET_CONNECTBLEDATA} from '@/store/actionsType.js';
import {GET_CONNECTBLEDATA} from '@/store/gettersType.js';
/**
 * 蓝牙初始化和注册
 */
Vue.prototype.$init_bluetooth = function(){
	console.log('蓝牙初始化');
	let _this = this;
	//获取android应用Activity活动对象
	main = plus.android.runtimeMainActivity();
	//引入Context类
	Context = plus.android.importClass("android.content.Context");
    // Context.BLUETOOTH_SERVICE  获取Context类的静态常量(蓝牙服务，获取BluetoothManager，以使用蓝牙)
	BManager = main.getSystemService(Context.BLUETOOTH_SERVICE);
	//获取蓝牙适配器对象类
	BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
	//蓝牙本地适配器(对象)
	BAdapter = BluetoothAdapter.getDefaultAdapter();
	//引入蓝牙设备类(创建与相应设备的连接或查询有关该设备的信息，例如名称，地址，类和绑定状态)
	BluetoothDevice = plus.android.importClass('android.bluetooth.BluetoothDevice');
	//引入过滤器类 (IntentFilter可以匹配Intent中的动作,类别,数据)
	IntentFilter = plus.android.importClass('android.content.IntentFilter');
}
/**
 * 检查蓝牙是否开启
 * 1.用户没有开启,提示开启
 * 2.用户蓝牙已经开启
 */
Vue.prototype.$check_bluetooth_open = function(){
	let _this = this;
	/**
	 * BAdapter.isEnabled(); 判断蓝牙是否打开
	 * BAdapter.enable();  //开启蓝牙
	 * BAdapter.disable();  //关闭蓝牙
	 */
	return new Promise((resolve,reject)=>{
		if (!BAdapter.isEnabled()) {
			//蓝牙未打开
			uni.showModal({
				title:"提示",
				content:"蓝牙未开启,是否开启蓝牙~",
				success:function(res){
					if (res.confirm) {
						//开启蓝牙
						BAdapter.enable();
						resolve(true);
					}else if(res.cancel){
						resolve(false);
					}
				}
			})
			// 后续提示框提示或用户手动打开
		} else {
			//蓝牙已打开
			resolve(true);
		}
	})
}

/**
 * 检测手机是否已经连接蓝牙设备
 */
Vue.prototype.$check_bluetooth_connect = function(){
	let _this = this;
	// 先清空vuex原来已有的数据
	_this.$store.dispatch(SET_CONNECTBLEDATA,[]);
	return new Promise((resolve,reject)=>{
		// 获取android应用已配对的蓝牙设备类
		let lists = BAdapter.getBondedDevices();
		// 引入类
		plus.android.importClass(lists);
		// 获取已配对蓝牙设备的个数
		let len = lists.size();
		// iterator()  把一个容器的所有对象，做成一个线性表（List），而iterator本身是一个指针
		let iterator = lists.iterator();  
		// console.log(iterator.hasNext());
		plus.android.importClass(iterator);
		/**
		 * iterator.hasNext()  true如果迭代具有更多元素
		 * iterator.next() 放回迭代中的下一个元素
		 * iterator.remove() 从基础集合中移除此迭代器返回的最后一个元素(可选操作)
		 */
		while (iterator.hasNext()) {
			let d = iterator.next();  
			plus.android.importClass(d);
			let matchList = {
				name: d.getName(),
				mac: d.getAddress()
			}
			console.log(matchList);
			_this.$store.dispatch(SET_CONNECTBLEDATA,matchList);
			resolve({code:true,msg:matchList});
		}
		
	    //获取一个已连接的设备
		// plus.android.importClass(BManager); //引入相关的method函数
		// //蓝牙适配器
		// let BAdapter = BManager.getAdapter();
		// // console.log(BAdapter);
		// plus.android.importClass(BAdapter); //引入相关的method函数，这样之后才会有isEna;
		// let lists = BAdapter.getBondedDevices();
		// // console.log(lists);
		// plus.android.importClass(lists);
		// let iterator = lists.iterator();
		// // console.log(iterator);
		// plus.android.importClass(iterator);
		// // console.log(iterator.hasNext());
		// if(iterator.hasNext()){   //判断下一个元素的有无
		// 	let d = iterator.next();
		// 	plus.android.importClass(d);
		// 	//已连接蓝牙的数据
		// 	// console.log(d.getAddress());
		// 	console.log(d.getAddress() + "----" + d.getName());
		// 	// _this.match_list = {
		// 	// 	name: d.getName(),
		// 	// 	mac: d.getAddress()
		// 	// };
		// 	let matchList = {
		// 		name: d.getName(),
		// 		mac: d.getAddress()
		// 	}
		// 	_this.$store.dispatch(SET_CONNECTBLEDATA,matchList);
		// 	// console.log(_this.$store.getters.GET_CONNECTBLEDATA)
		// 	/** 
		// 	 * 连接打印机
		// 	 */
		//     resolve({code:true,msg:matchList});
		// }else{
		// 	resolve({code:false})
		// }
	})
}
/**
 * 打开蓝牙
 */
Vue.prototype.$open_bluetooth = function(){
	let _this = this;
	return new Promise((resolve,reject)=>{
		if (!BAdapter.isEnabled()) {
			BAdapter.enable(); //启动蓝牙
			uni.showToast({
				icon: "none",
				title: '蓝牙已打开',
				duration: 3000
			})
			resolve(true);
		}
	})
}
/**
 * 关闭蓝牙 
 */
Vue.prototype.$close_bluetooth = function (){
	let _this = this;
	if (BAdapter.isEnabled()) {
		BAdapter.disable(); //关闭蓝牙  
		uni.showToast({
			icon: "none",
			title: '蓝牙已关闭',
			duration: 2000
		})
	} else {
		uni.showToast({
			icon: "none",
			title: '蓝牙已关闭',
			duration: 2000
		})
	}
}
/**
 * 搜索蓝牙设备
 */
Vue.prototype.$search_bluetooth = function(){
	let _this = this;
	let obj = {};
	return new Promise((resolve,reject)=>{
		// console.log(BAdapter.isEnabled());
		// console.log(JSON.stringify(_this.$store.getters));
		// BAdapter.isconnect("DC:1D:30:7C:74:96");
		//判断蓝牙是否开启
		if(!BAdapter.isEnabled()) {
			uni.showModal({
				title:"提示",
				content:"蓝牙未开启,是否开启蓝牙~",
				success:function(res){
					if (res.confirm) {
						console.log('用户点击确定');
						obj.code = false;  //用户点击确定,开启蓝牙
						obj.msg = "蓝牙未开启";
						resolve(obj);
						// _this.$open_bluetooth();
					}else if(res.cancel){
						// resolve()
						obj.code = null;
						resolve(obj);
					}
				}
			})
		}else{
			obj.code = true;
			obj.msg = "开启搜索蓝牙";
			resolve(obj);
		}
	})
}
/**
 * 监听蓝牙设备信息
 */
Vue.prototype.$search_pipei=function(){
	let timer = null;
	let _this = this;
	//提示蓝牙开启权限访问
	uni.openBluetoothAdapter({
		success(res) {
			if (res.errMsg === "openBluetoothAdapter:ok") {
				//这里是开启蓝牙搜寻
				uni.startBluetoothDevicesDiscovery({
					success: (res) => {
						console.log('startBluetoothDevicesDiscovery success', res)
						uni.showLoading({
							title: "蓝牙搜索中...",
							mask: true
						})
						//每次搜索都把之前的清空
						// _this.bArray = [];
						// _this.no_match_list = [];
						_this.$store.dispatch(SET_INFODATA,[]);
						let bArray = [];  //用于蓝牙去重
						let filter = new IntentFilter();   //实例化过滤器类
						let BDevice = new BluetoothDevice();  //实例化蓝牙设备类
						// let connect = _this.$store.state.Bluetooth.connectBLEData;
						// console.log("已连接:" + JSON.stringify(connect));
						BAdapter.startDiscovery(); //开启搜索 
						let receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
							onReceive: function(context, intent) { //回调 
								try {
	                               plus.android.importClass(intent);
								   if (intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED") {
								   	 main.unregisterReceiver(receiver); //取消监听 
								   } else {
									   // Intent中获取设备对象
									  BDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
									  console.log(BDevice.getName() + "---" + BDevice.getAddress());
									  // 判断如果蓝牙没有名称则不显示
									  if (BDevice.getName() !== null) {
										//蓝牙去重
										let address = BDevice.getAddress();
										//已经连接的蓝牙
										if(bArray.indexOf(address) == -1){
											bArray.push(address);
											_this.$store.dispatch(SET_INFODATA,{
												name: BDevice.getName(),
												mac: BDevice.getAddress()
											})
										}
									  }
									  //如果intent为空则取消蓝牙监听
									  if (BDevice == null) {
									  	main.unregisterReceiver(receiver); //取消监听 
									  	uni.hideLoading()
									  	//获取已匹配的蓝牙  
									  	// that.bluetooth_list() 
									  	return;
									  }
									  if(timer != null){
										  clearTimeout(timer);
									  }
									  timer = setTimeout(()=>{
										  main.unregisterReceiver(receiver); //取消监听
										  uni.hideLoading();
									  },3000);
								   }
								} catch (e) {
								    uni.showToast({
								    	icon: "none",
								    	title: "蓝牙搜寻错误~",
								    	duration: 3000,
								    	mask: true
								    })
								}
							}
						});
						
						filter.addAction(BDevice.ACTION_FOUND);   //可发现
						filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);   
						filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);  //搜索结果
						filter.addAction(BAdapter.ACTION_STATE_CHANGED);
						main.registerReceiver(receiver, filter); //注册监听
					},
					fail: (err) => {
						uni.showToast({
							icon: "none",
							title: "蓝牙搜寻失败~",
							duration: 3000,
							mask: true
						})
					}
				})
			}
		},
		fail(err) {
			uni.showToast({
				icon: "none",
				title: "蓝牙搜索失败"
			})
		}
	})
}
