/*
 * mock 存放全局静态数据
 */
import Vue from 'vue';
const allMock = {
	test: ['静态数据'],
	//面单数据
	order_data: {
		CUSTOMER_CODE: "GBN",
		CUSTOMER_CODE1: "产品溯源码",
		BILL_CODE:'http://192.168.106.138:8080/trace_qr/qr'
	},
	printTemplate: {
		"pagConfig2": {
			"pageLeft": "0",
			"pageTop": "0",
			"pageHeight": "19",
			"pageWidth": "54"
		},
		"printItem2": [
			{
				"dataId": "CUSTOMER_CODE",
				// "top": "50",
				"top": "20",
				// "left": "180",
				"left": "125",
				"textAlign": "start",
				"width": "152",
				"fontSize": 50,
				"text": "",
				"type": "field",
				"fontWeight": "500",
				"height": "30"
			},
			{
				"dataId": "CUSTOMER_CODE1",
				"top": "35",
				// "left": "180",
				"left": "105",
				"textAlign": "start",
				"width": "152",
				"fontSize": "50",
				"text": "",
				"type": "field",
				"fontWeight": "500",
				"height": "30"
			},
			{
				"dataId": "CUSTOMER_CODE2",
				"top": "50",
				// "left": "180",
				"left": "117",
				"textAlign": "start",
				"width": "152",
				"fontSize": "50",
				"text": "",
				"type": "field",
				"fontWeight": "500",
				"height": "30"
			},
			{
				"imgUrl": "",
				"dataId": "BILL_CODE",
				"top": "10",
				"left": "35",
				"textAlign": "start",
				"width": "38",
				"text": "",
				"type": "qrCode2",
				"fontWeight": "100",
				"height": "38"
			}
		]
	}
}

export default allMock;
