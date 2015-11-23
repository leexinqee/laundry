//var BASEURL = 'http://tongke.shenyao.net/apis';
var BASEURL = "";
var APPKEY = "";


function Ajax(options, successcb, errorcb, nonetworkcb) {
	var net = plus.networkinfo.getCurrentType();
	if (net != 0 && net != 1) {
		innerAjax(options, successcb, errorcb)
	} else {
		if (nonetworkcb) {
			nonetworkcb()
		} else {
			plus.navigator.closeSplashscreen();
			errorcb && errorcb({status: "neterror", messages: "当前无网络状态，请重试"})
		}
	}
}

function closemask(){
	var mask = document.getElementById("mask");
	if(mask){
		mask.style.display = 'none'
	}
}

function innerAjax(options, successcb, errorcb) {
	
	var op = {
		dataType: 'json',
		type: 'post',
		loading:{},
		url: '',
		data: {}
	};
	copyobj(options, op);
	mui.ajax(BASEURL + op.url, {
		type: op.type,
		data: op.data,
		dataType: op.dataType,
		timeout: '10000',
		success: function(data) {
			successcb && successcb(data)
		},
		error: function(data) {
			errorcb(data)
		}
	})
}


function getwebid(url) {
	var start = url.lastIndexOf('/');
	var end = url.indexOf('.html');
	var pageid = url.substring(start + 1, end);
	return pageid;
}

function copyobj(from, to) {
	for (var i in from) {
		if (typeof from[i] == 'object') {
			copyobj(from[i], to[i])
		} else {
			to[i] = from[i];
		}
	}
}

function preload(webArr, cb) {
		var len = webArr.length;
		for (var i = 0; i < len; i++) {
			var pageid = getwebid(webArr[i]);
			var temppage = 'page' + i;
			if (webArr) {
				temppage = mui.preload({
					url: webArr[i],
					id: pageid
				})
			}
		}
		cb && cb();
	}
	// 打开窗口

function openWindow(url, param, aniType, aniTime) {
	if (window.plus) {
		mui.openWindow({
			id: getwebid(url),
			url: url,
			extras: param || {},
			show: {
				autoShow: true,
				aniShow: aniType || "slide-in-right",
				duration: aniTime || 300
			},
			waiting: {
				autoShow: false,
				title: '正在加载...',
				options: {
					background: '#d1d1d1',
					width: 100,
					height: 100
				}
			}
		})
	} else {
		alert('system is not ready')
	}
}

// 关闭数据加载层
function closeMask() {
	// 300毫秒之后清除等待框
	var lmask = document.getElementById("loading-mask");
	var lbox = document.getElementById("loading-box");
	if(!lmask){
		return;
	}
	if(!lbox){
		return;
	}
	var mcl = lmask.classList;
	var bcl = lbox.classList;
	
	mcl.add("fade-out");
	bcl.add("fade-out");
	// 过渡动画结束的时候执行该事件
	lmask.addEventListener("webkitTransitionEnd", function() {
		document.getElementById("loading-mask").style.display = "none";
		document.getElementById("loading-box").style.display = "none";
		mcl.remove("fade-out");
		bcl.remove("fade-out");
	}, false)
}

// 显示数据加载层
function showMask(){
	document.getElementById("loading-mask").style.display = "block";
	document.getElementById("loading-box").style.display = "block";
}
