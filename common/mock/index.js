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
		// CUSTOMER_NAME: "宋小姐",
		// BILL_CODE: "JYM100005228492",
		// PRINT_DATE_REAL:"2020-09-08 17:31:21",
		// SEND_MAN: "城南旧事",
		// SEND_MAN_PHONE: "176111111111",
		// SEND_PROVINCE: "广东省",
		// SEND_CITY: "xx市",
		// SEND_COUNTY: "xx区",
		// SEND_MAN_COMPANY: "树城建材有限公司",
		// ACCEPT_MAN: "宋小姐",
		// ACCEPT_MAN_PHONE: "176311111111",
		// ACCEPT_MAN_ADDRESS: "广东省xxxxxxxxxxxxxxxxxxxxxxxx",
		// PIECE_NUMBER: "11",
		// PAYMENT_TYPE: "到付",
		// RETURN_BILL_TYPE: "邮寄",
		// SETTLEMENT_WEIGHT: "11kg",
		// TRANSFER_CODE: "JDVX9999999999999",
		// REMARK: "次物品小心配送,易碎品,备注这是备注这是备注这是备注这是备注注这是备注这是备注注",
		// PACK_TYPE: "货物类",
		// FREIGHT: "120",
		//https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb571dc8c5133d3d539b600bc12?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg
		// QR_CODE_IMAGE:"https://iknow-pic.cdn.bcebos.com/b58f8c5494eef01f8eeef212e2fe9925bd317d6b?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1",
		BILL_CODE:'http://192.168.106.138:8080/trace_qr/qr'
	},
	printTemplate: {
		"pagConfig": {
			"pageLeft": "0",
			"pageTop": "0",
			"pageHeight": "19",
			"pageWidth": "54"
		},
		"printItem": [
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
				"top": "40",
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
				"imgUrl": "",
				"dataId": "BILL_CODE",
				"top": "10",
				"left": "35",
				"textAlign": "start",
				"width": "36",
				"text": "",
				"type": "qrCode",
				"fontWeight": "100",
				"height": "36"
			}
		]
	}
}

export default allMock;
