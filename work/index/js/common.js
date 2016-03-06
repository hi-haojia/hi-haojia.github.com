// JavaScript Document

/**
*	Set Order By strive.
*	copyright by other.
**/
//t  当前时间
//b  初始值
//c  总距离
//d  总时间
//var cur=fx(t,b,c,d)
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};

//ready
function ready(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded',fn,false);
	}
	else
	{
		document.onreadystatechange=function(){
			if(document.readyState=='complete')
			{
				fn();
			}
		}	
	}
}

//滚轮
function addWheel(obj,fn)
{
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1)
	{
		obj.addEventListener('DOMMouseScroll', _wheel, false);
	}
	else
	{
		obj.onmousewheel=_wheel;
	}
	function _wheel(ev)
	{
		var oEvent=ev || event;
			
		if(oEvent.wheelDelta)
		{
			down=oEvent.wheelDelta>0 ? false : true;
		}
		else
		{
			down=oEvent.detail>0 ? true : false;
		}
		
		fn(down);
	}
}

//拖拽
function drag(obj)
{
	obj.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-obj.offsetLeft;
		var disY=oEvent.clientY-obj.offsetTop;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var left=oEvent.clientX-disX;
			var top=oEvent.clientY-disY;
			obj.style.left=left+'px';
			obj.style.top=top+'px';
		}
		document.onmouseup=function(ev){
			document.onmousemove=null;
			document.onmouseup=null;
			obj.releaseCaptrue && obj.releaseCaptrue();
		}
		obj.setCaptrue && obj.setCaptrue();
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
}

//getStyle
function getStyle(obj,sName)
{
	return (obj.currentStyle||getComputedStyle(obj,false))[sName]
}

//运动
function move(obj,json,options){
		options=options||{};
		options.easing=options.easing||Tween.Linear;
		options.duration=options.duration||300;
		var start={};
		var dis={};
		for(var name in json){
			start[name]=parseFloat(getStyle(obj,name));
			if(isNaN(start[name])){
				switch(name){
					case 'width':
						start[name]=obj.offsetWidth;
						break;
					case 'left':
						start[name]=obj.offsetLeft;
						break;
					case 'top':
						start[name]=obj.offsetTop;
						break;
					case 'height':
						start[name]=obj.offsetHeight;
						break;	
					case 'opacity':
						start[name]=1;
						break;
					case 'borderWidth':
						start[name]=0;
						break;
				}	
			}
			dis[name]=parseFloat(json[name])-start[name];
		}
		var count=Math.floor(options.duration/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var name in json){
				var cur=options.easing(options.duration*n/count,start[name],dis[name],options.duration);
				if(name=='opacity'){
					obj.style[name]=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';	
				}else{
					obj.style[name]=cur+'px';	
				}	
			}
			if(n==count){
				clearInterval(obj.timer);
				options.complete&&options.complete();	
			}	
		},30);	
	};

//getPos
function getPos(obj)
{
	var left=0;
	var top=0;
	while (obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:left, top:top};
}

//补零
function toDub(n)
{
	return n<10 ? '0'+n : ''+n;
}

//getByClassName
function getByClass(oParent,sName)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sName);
	}
	else
	{
		var arr=[];
		var aChild=oParent.getElementsByTagName('*');
		for(var i=0;i<aChild.length;i++){
			var obj=aChild[i];
			var aTmp=aChild[i].className.split(' ');
			for(var j=0;j<aTmp.length;j++){
				if(aTmp[j]==sName){
					arr.push(obj);
				}
			}
		}
		return arr;
	}
}

//选型卡
function tab(sName)
{
	var aParent=document.getElementsByClassName(sName);
	for (var i=0; i<aParent.length; i++)
	{
		_tab(aParent[i]);
	}
	
	function _tab(oParent)
	{
		var aBtn=oParent.getElementsByClassName('j-btn');
		var aBox=oParent.getElementsByClassName('j-box');
		
		for (var i=0; i<aBtn.length; i++)
		{
			aBtn[i].index=i;
			aBtn[i].onclick=function (){
				for (var i=0; i<aBtn.length; i++)
				{
					aBtn[i].className='j-btn';
					aBox[i].className='j-box';
				}
				this.className='j-btn active';
				aBox[this.index].className='j-box active';
			};
		}
	}
}

//n-m随机数
function rnd(n, m)
{
	return Math.floor(Math.random()*(m-n)+n);
}

//事件绑定
function addEvent(obj, sEv, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener(sEv, fn, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, fn);
	}
}

//解除绑定
function removeEvent(obj, sEv, fnName)
{
	if (obj.removeEventListener)
	{
		obj.removeEventListener(sEv, fnName, false);
	}
	else
	{
		obj.detachEvent('on'+sEv, fnName);
	}
}

//addCookie
function addCookie(name,value,iDay)
{
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	if(iDay)
	{
		document.cookie=name+'='+value;'path=/';'expires='+oDate;
	}	
	else
	{
		document.cookie=name+'='+value;'path=/';
	}
}

//getCookie
function getCookie(name)
{
	var arr=document.cookie.split('; ');
	
	for(var i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');
		if(name==arr2[0])
		{
			return arr2[1];
		}
		else
		{
			return '';
		}
	}	
}

//removeCookie
function removeCookie(name)
{
	addCookie(name,'',-100);
}

/*批量设置样式*/
function setStyle(obj,json)
{
	for(var name in json)
	{
		obj.style[name]=json[name]+'px';
	}
}