汉印便携式打印机(HM-A300)

1.蓝牙连接打印机
<--0:连接成功，-1:连接异常，-2:蓝牙地址错误， -3:打印机与 SDK 不匹配(握手指令错误)-->
HanyinPlugin.PortOpenBT({mac:"蓝牙mac地址"},res=>{});

2.开启打印机打印
<--大于 0:正常，否则异常-->
HanyinPlugin.Print({},res=>{});

3.页标开始指令
<--
   大于 0:正常，否则异常
   根据打印机的 dpi 设置，200dpi 打印机:8px=1mm
-->
HanyinPlugin.printAreaSize({
	offset:"水平偏移指定的单位数量",
	Horizontal:"水平方向的 dpi",
	Vertical:"垂直方向的 dpi",
	Height:"整个标签的高度",
	Qty:"打印的次数"
},res=>{})

4.设置编码
<--大于 0:正常，否则异常-->
HanyinPlugin.Encoding({
	type:"正常不用设置"
},res=>{})

5.打印浓度
<--
   大于 0:正常，否则异常
   默认 =0 中 =1 黑暗 =2 非常深 =3
-->
HanyinPlugin.Contrast({
	contrast:""
},res=>{})


6.打印的速度
<--
   大于 0:正常，否则异常
   从 0 到 5 越来越快;5 是理想状态的最快速度
-->
HanyinPlugin.Speed({
	speed:""
},res=>{})


7.走纸到下一张标签
<--
大于 0:正常，否则异常
必须跟 PRINT 在一起才有效，指令只对标签有效，连续纸不可用
-->
HanyinPlugin.Form({},res=>{})

8.走纸在打印
<--大于 0:正常，否则异常-->
HanyinPlugin.Prefeed({
	Prefeed:"走纸的距离"
},res=>{})

9.打印宽度
<-- 大于 0:正常，否则异常 -->
HanyinPlugin.PageWidth({
	pw:"指定页面宽度"
},res=>{})

10.打印后走纸一定距离
<--大于 0:正常，否则异常-->
HanyinPlugin.Posfeed({
	posfeed:"走纸的距离"
},res=>{})

11.获取打印机状态
<--0:打印机准备就绪。 1:打印机打印中。 2:打印机缺纸。 6:打印机开盖。 其他:出错 -->
HanyinPlugin.Getstatus({},res=>{})

12.文字自动换行
<--
   大于 0:正常，否则异常
   x:文字的起始的 x 坐标。(单位:PX) 
   y:文字的起始的 y 坐标。(单位:PX) 
   width:一行打印的宽度。(单位:PX) 
   size:字体。3:20x20 或 10x20，视中英文而定。4:32x32 或 16x32，由 ID3 字体宽高各放大 2 倍。 8:24x24 或 12x24，视中英文而定。55:16x16 或 8x16，视中英文而定。
   isbole:加粗。 true:加粗。false:不加粗。 
   isdouble:放大两倍字体。true:放大。false:不放大。 
   Str:要打印的文本。
   type: 1 或 2
-->

HanyinPlugin.AutLine({
	x:"文字的起始的 x 坐标",
	y:"文字的起始的 y 坐标",
	size:"",
	isbole:"",
	isdouble:"",
	str:"",
	type:"",
	width:"一行打印的宽度"
},res=>{})


13.注释
<--大于 0:正常，否则异常。-->
HanyinPlugin.Note({node:"注释的内容"},res=>{})

14.打印文字
<--
   大于 0:正常，否则异常。
   command: 0:水平  1:逆时针旋转90度  2:逆时针旋转 180 度  3:逆时针旋转 270 度
   font:   
    0:12x24。 1:12x24(中文模式下打印繁体)，英文模式下字体变成(9x17)大小 2:8x16。
	3:20x20。
	4:32x32 或者 16x32，由 ID3 字体宽高各放大两倍。 7:24x24 或者 12x24，视中英文而定。
	8:24x24 或者 12x24，视中英文而定。
	20:16x16 或者 8x16，视中英文而定。
	24:24x24 或者 12x24，视中英文而定。
	55:16x16 或者 8x16，视中英文而定。
	其它默认 24x24 或者 12x24，视中英文而定
	
   size :字体大小。(该功能被屏蔽统一参数传 0) 
   x:起始点的横坐标。(单位:px) 
   y:起始点的纵坐标。(单位:px) 
   data:文本数据。
-->
HanyinPlugin.Text({
	command:0,
	font:"",
	size:"",
	x:"",
	y:"",
	data:""
},res=>{})


15.文字打印(用于中文固件)
<--
	大于 0:正常，否则异常。
	command: 0:水平   1:垂直
	font:字体点阵大小(单位:px)
			1:打印繁体字(24x24 或者 12x24，视中英文而定。) 
			16:16x16 或 8x16，视中英文而定。
			24:24x24 或 12x24，视中英文而定。
			32:32x32 或 16x32，由 ID3 字体宽高各放大 2 倍。
	x:起始点的横坐标。(单位:px) Y:起始点的纵坐标。(单位:px) Data:文本数据。
	N:字体的特效: 0:加粗  1:反白  2:倍宽  3:倍高
	Iscenter:是否居中。 true:是。false:否。
	width:要居中的范围。(Iscenter=true 时才生效)
-->
HanyinPlugin.PrintTextCPCL({
	command:0,
	font:"",
	x:"",
	y:"",
	data:"",
	N:"",
	Iscenter:"",
	width:""
},res=>{})

16.文字打印(用于英文固件)
<--
   大于 0:正常，否则异常。
   command: 0:水平   1:垂直
   font:字体点阵大小(单位:px)  0:12x24。 1:9x17。 
   x:起始点的横坐标。 
   y:起始点的纵坐标。 
   data:文本数据。 
   N:字体的特效:0:加粗  1:反白  2:倍宽  3:倍高
-->

HanyinPlugin.PrintCodepageTextCPCL({
	command:0,
	font:"",
	x:"",
	y:"",
	data:"",
	N:""
},res=>{})


17.设置字符宽高放大倍数
<--
	大于 0:正常，否则异常
	注意:使用后记得关闭。
	HanyinPlugin.SetMag({width:"2",height:"2"}); //对下面的字体进行放大(如不需要不用添加)
	HanyinPlugin.Text();  //需要放大的字体
	HanyinPlugin.SetMag({width:"1",height:"1"})//关闭放大
-->
HanyinPlugin.SetMag({
	width:"宽的放大倍数",
	height:"高的放大倍数"
},res=>{})


18.设置字间距

<--大于 0:正常，否则异常。-->
HanyinPlugin.SetSp({setsp:"间距"},res=>{})

19.添加下划线
<--
   大于 0:正常，否则异常。
   ul :true:添加下划线，false:取消下划线。
   HanyinPlugin.Underline({ul:true})
   HanyinPlugin.Text();
-->
HanyinPlugin.Underline({ul:"true"},res=>{});


20.字体加粗
<--
	注意:使用完后记得关闭加粗。如不需要加粗不用添加
	bold: "0":关闭加粗    加粗系数(范围:1-5)
	
	HanyinPlugin.Underline({bold:"1"})
	HanyinPlugin.Text();
	HanyinPlugin.Underline({bold:"0"})
-->
HanyinPlugin.SetBold({bold:""},res=>{})

21.打印条码
<--
  大于 0:正常，否则异常。
  command:条码方向   0:水平  1:垂直 
  width:窄条的单位宽度
  ratio:宽条窄条的比例
      0 = 1.5:1,
	  1 = 2.0:1,
	  2 = 2.5:1,
	  3 = 3.0:1,
	  4 = 3.5:1,
	  20= 2.0:1,
	  21= 2.1:1,
	  22= 2.2:1,
	  23= 2.3:1,
	  24= 2.4:1,
	  25= 2.5:1,
	  26= 2.6:1,
	  27= 2.7:1,
	  28= 2.8:1,
	  29= 2.9:1,
	  30= 3.0:1
   height:条码高度
   x:条码的起始横坐标
   y:条码的起始纵坐标
   undertext:条码下方的数据是否可见。ture:可见，false:不可见
   number:字体类型
   size:字体大小
   offset:条码与文字间的距离
   data:条码数据,
   Type:条码类型
       UPCA,UPCA2,UPCA5,UPCE,UPCE2,UPCE5,EAN13,EAN132,
	   EAN135,EAN8,EAN82,code39,code39C,F39,F39C,code93,
	   I2OF5,I2OF5C,I2OF5G,code128,UCCEAN128,CODABAR,CODABAR16,
	   MSI,MSI10,MSI1010,MSI1110,POSTNET,FIM
-->

HanyinPlugin.Barcode({
	command:0,
	width:"1",
	ratio:"2",
	height:"",
	undertext:"",
	number:"7",
	x:"",
	y:"",
	size:"0",
	offset:"1",
	data:"",
	type:""
},res=>{})


22.打印二维码
<--
   大于 0:正常，否则异常。
   command:条码方向   0:水平  1:垂直 
   x:二维码的起始横坐标。
   y:二维码的起始纵坐标。
   m:QR 的类型:类型 1 和类型 2;类型 2 是增加了个别的符号，提供了而外的功能。 
   u:单位宽度/模块的单元高度。范围是1到32默认为6。 
   data:二维码的数据。
-->
HanyinPlugin.PrintQR({
	command:0,
	m:"",
	u:"",
	x:"",
	y:"",
	data:""
},res=>{})

23.打印 PDF417 码
<--
	大于 0:正常，否则异常。
	command: 条码方向   0:水平  1:垂直 
	x:二维码的起始横坐标。
	y:二维码的起始纵坐标。
	xd:最窄元素的单位宽度。范围是 1 到 32，默认为 2。 
	yd:最窄元素的单位高度。范围是 1 到 32，默认值是 6。 
	c:使用的列数。数据列不包括启动/停止字符和左/右指标。范围为 1 到 30;默认值是3。 
	s:安全级别表示要检测到的错误的最大金额和/或校正。范围为0到8;默认值是1。 
	data:PDF417 码的数据。
-->
HanyinPlugin.PrintPDF417({
	command:0,
	xd:"",
	yd:"",
	x:"",
	y:"",
	c:"",
	s:"",
	data:""
},res=>{})


24.画矩形框
<--
	大于 0:正常，否则异常
	x0:左上角的 X 坐标。(单位:px) 
	y0:左上角的 Y 坐标。(单位:px) 
	x1:右下角的 X 坐标。(单位:px) 
	y1:右下角的 Y 坐标。(单位:px) 
	width:线条的单位宽度。
-->
HanyinPlugin.Box({
	x0:"",
	y0:"",
	x1:"",
	y1:"",
	width:""
},res=>{})


25.画直线
<--
    大于 0:正常，否则异常。
	x0:起始的 X 坐标。(单位:px) 
	y0:起始的 Y 坐标。(单位:px) 
	x1:结尾的 X 坐标。(单位:px) 
	y1:结尾的 Y 坐标。(单位:px) 
	width:线条的单位宽度。
-->
HanyinPlugin.Line({
	x0:"",
	y0:"",
	x1:"",
	y1:"",
	width:""
},res=>{})


26.反白框
<--
    大于 0:正常，否则异常
	x0:起始的 X 坐标。(单位:px) 
	y0:起始的 Y 坐标。(单位:px) 
	x1:结尾的 X 坐标。(单位:px) 
	y1:结尾的 Y 坐标。(单位:px) 
	width:反白框的宽度。
-->
HanyinPlugin.InverseLine({
	x0:"",
	y0:"",
	x1:"",
	y1:"",
	width:""
},res=>{})

27.打印图片
<--
	x:图片起始的 x 坐标。(单位:px) 
	y:图片起始的 y 坐标。(单位:px) 
	img:base64格式图片(其他无效)
	type:图片算法。0:二值算法;1:半色调算法。 
	light:亮度(默认 0)。
-->
HanyinPlugin.Expanded({
	x:"",
	y:"",
	img:"",
	type:"",
	light:""
},res=>{})

