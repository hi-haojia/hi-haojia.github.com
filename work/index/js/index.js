// JavaScript Document
ready(function(){
	
	/*全屏滚动*/
	$('#section_wrap').fullpage({
		anchors:['1', '2', '3','4','5','footer'],
		'navigation': true,
		'resize':false,
		'verticalCentered':false,
	});
	
	/*动态效果控制*/
	;(function(){
		var arr=[true,true,true,true,true];
		var oH1=document.getElementById('h1');
		var oPerson_img=document.getElementById('person_img');
		var oPerson_info=document.getElementById('person_info');
		var oProducts=document.getElementById('products_con');
		var aLi=oProducts.getElementsByTagName('li');
		setInterval(function(){
			var now=window.location.hash.substring(1);
			if(now==2)
			{
				if(arr[1])
				{
					works_drag();
				}
				arr[1]=false;	
			}
			if(now==4)
			{
				if(arr[3])
				{
					setTimeout(more,500);
				}
				arr[3]=false;
			}
			if(now==3)
			{
				if(arr[2])
				{
					three();
				}
				arr[2]=false;
			}
			/*else
			{
				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].style.opacity=0;
				}
				arr[2]=true;
			}*/
			if(now==5)
			{
				if(arr[4])
				{
					move(oPerson_info,{top:20},{duration:2000,easing:Tween.Elastic.easeOut});
					move(oPerson_img,{right:20},{duration:2000,easing:Tween.Elastic.easeOut});
				}
				arr[4]=false;
			}else
			{
				if(now!='footer')
				{
					oPerson_info.style.top='-1000px';
					oPerson_img.style.right='-1000px';
					/*move(oPerson_info,{top:-1000},{duration:3000});
					move(oPerson_img,{right:-1000},{duration:3000});*/
					arr[4]=true;
				}
			}
			switch(now)
			{
				case '1':
					oH1.innerHTML='holly_zone';
					break;
				case '2':
					oH1.innerHTML='effect';
					break;
				case '3':
					oH1.innerHTML='works';
					break;
				case '4':
					oH1.innerHTML='mobile';
					break;	
				case '5':
					oH1.innerHTML='information';
			}
		},100);
	})();
	
	//新闻
	(function(){
		var oNews=document.getElementById('news');
		ajax({url:'http://api.1-blog.com/biz/bizserver/news/list.do',
			success:function(json){
				var json=eval('('+json+')');
				var arr=json.detail;
				var n=0;
				oNews.innerHTML='今日热点 : <a href="'+arr[n].article_url+'" target="_blank" title="'+arr[n].title+'">'+arr[n].title+'</a>';
				var timer=setInterval(function(){
					n++;
					if(n==arr.length)
					{
						n=0;
					}
					oNews.innerHTML='今日热点 : <a href="'+arr[n].article_url+'" target="_blank" title="'+arr[n].title+'">'+arr[n].title+'</a>';
				},1000);
			}
		});
	})();
	
	
	//天气
	(function(){
		var oWeather_s=document.getElementById('weather_s');
		var oWeather_b=document.getElementById('weather_b');
		var oWeather=document.getElementsByClassName('weather')[0];
		oWeather.onmouseover=function(){
			oWeather.style.background='#E5AEE5';
			oWeather_b.style.display='block';
		}
		oWeather.onmouseout=function(){
			oWeather.style.background='';
			oWeather_b.style.display='none';
		}
		jsonp({url:'http://api.k780.com:88/',data:{
			app:'weather.today',
			appkey:10003,
			sign:'b59bc3ef6191eb9f747dd4e83c99f2a4',
			format:'json',
			weaid:'北京'
			},
			cbName:'jsoncallback',
			success:function(json){
				json=json.result;
				//图片
				jsonp({url:'http://api.k780.com:88/',data:{
						typeid:1,
						app:'code.hanzi_pinyin',
						appkey:10003,
						sign:'b59bc3ef6191eb9f747dd4e83c99f2a4',
						format:'json',
						wd:json.weather
					},
					cbName:'jsoncallback',
					success:function(json){
						
						var weather=json.result.ret.split(' ')[0];
						var h=new Date().getHours();
						if(h>7 && h<20)
						{
							var img_s_url='http://php.weather.sina.com.cn/images/yb3/78_78/'+weather+'_0.png';
							var img_b_url='http://php.weather.sina.com.cn/images/yb3/180_180/'+weather+'_0.png'
						}
						else
						{
							var img_s_url='http://php.weather.sina.com.cn/images/yb3/78_78/'+weather+'_1.png';
							var img_b_url='http://php.weather.sina.com.cn/images/yb3/180_180/'+weather+'_1.png'
						}
						oWeather_s.style.background='url('+img_s_url+') no-repeat';
						oWeather_s.style.backgroundSize='auto 130%';
						oWeather_b.style.backgroundImage='url('+img_b_url+')';
					}
				});
				if(json.temp_high<json.temp_curr)
				{
					json.temp_high=json.temp_curr;
				}
				oWeather_b.innerHTML='<li>'+json.temp_curr+'℃</li><li>'+json.citynm+'</li><li>'+json.weather+' '+json.wind+' '+json.winp+'</li><li>'+json.temp_low+'℃/'+json.temp_high+'℃</li><li>'+json.days+' '+json.week+'</li>';
			}
		});
	})();
	
	
	/*第二屏-作品集拖拽*/
	function works_drag(){
		var oWorks = document.getElementById('works');
		var aLi = oWorks.children;
		var zIndex=1;
		/*布局转换*/
		var aPos=[];
		for(var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop	
			});
		}	
		for(var i=0; i<aLi.length;i++)
		{
			aLi[i].index=i;
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;
		}
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].style.left=0;
			aLi[i].style.top=0;
			aLi[i].style.height=0;
			aLi[i].style.width=0;
		}
		(function(){
			var n=aLi.length-1;
			var timer=setInterval(function(){
				move(aLi[n],{
					left:aPos[n].left,
					top:aPos[n].top,
					width:150,
					height:150	
				},{duration:1000});
				n--;
				if(n==-1)
				{
					clearInterval(timer);
				}
			},200);
		})();
		
		/*拖拽*/
		for(var i=0; i<aLi.length; i++)
		{
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function(ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var oNear=null;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvent = ev || event;
					var left = oEvent.clientX-disX;
					var top = oEvent.clientY-disY;
					setStyle(obj,{left:left,top:top});
					oNear = findNear(obj,aLi);
					if(oNear)
					{
						if(oNear && oNear!=obj){
							var n=obj.index;
							var m=oNear.index;

							if(n<m){
								for(var i=0; i<aLi.length; i++){
									if(aLi[i].index>=n+1 && aLi[i].index<=m){
										aLi[i].index--;
										move(aLi[i],aPos[aLi[i].index]);
									}
								}
								obj.index=m;
							}else{
								for(var i=0; i<aLi.length; i++){
									if(aLi[i].index>=m && aLi[i].index<=n-1){
										aLi[i].index++;
										move(aLi[i],aPos[aLi[i].index]);
									}
								}
								obj.index=m;
							}
						}
						
					}
				
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					/*交换位置*/	
					
					move(obj,aPos[obj.index]);
					obj.releaseCapture && obj.releaseCapture();
				};
				obj.setCapture && obj.setCapture();
				return false;
			};	
			
		}	
		/*计算两个物体间距离*/
		function getDis(obj1,obj2)
		{
			var a = obj1.offsetLeft+obj1.offsetWidth/2-aPos[obj2.index].left-obj2.offsetWidth/2;
			var b = obj1.offsetTop+obj1.offsetHeight/2-aPos[obj2.index].top-obj2.offsetHeight/2;
			return Math.sqrt(a*a+b*b);
		}
		/*碰撞检测*/
		function collTest(obj1,obj2)
		{
			var l1 = obj1.offsetLeft;
			var r1 = l1+obj1.offsetWidth;
			var t1 = obj1.offsetTop;
			var b1 = t1+obj1.offsetHeight;
			
			var l2=aPos[obj2.index].left;
			var r2=aPos[obj2.index].left+obj2.offsetWidth;
			var t2=aPos[obj2.index].top;
			var b2=aPos[obj2.index].top+obj2.offsetHeight;
			if(l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;	
			}
		}
		/*找最近*/
		function findNear(obj,aLi)
		{
			var nMin = 9999;
			var nMinIndex = -1;
			for(var i=0; i<aLi.length; i++)
			{
				
				if(collTest(obj,aLi[i])) //发生碰撞了
				{
					var dis = getDis(obj,aLi[i]);  //计算碰撞了的距离
					if(dis<nMin)
					{
						nMin=dis;
						nMinIndex =i;
					}
				}
				
			}
			if(nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
	}
	
	
	/*第二屏-自由运动的小球*/
	(function(){
		var oDiv = getByClass(document,'move-boll')[0];
		var oBoll = oDiv.children[0];	
		var maxLeft = oDiv.offsetWidth-oBoll.offsetWidth;
		var maxTop = oDiv.offsetHeight-oBoll.offsetHeight;
		window.next=function()
		{
			var nextLeft = rnd(0,maxLeft);
			var nextTop = rnd(0,maxTop);
			var aPos={
				left:nextLeft,top:nextTop	
			};	
			move(oBoll,aPos,{
				complete:function(){
					next();
				},duration:800
			});
		}
		next();
	})();
	
		
	/*第三屏效果-拉钩网效果*/
	function three(){
		var oUl=document.getElementById('products_con').children[0];
		var oBtn=document.getElementById('btn');
		var aLi=oUl.children;
		var w=aLi[0].offsetWidth;
		var h=aLi[0].offsetHeight;
		var zIndex=1;
		var aPos=[];
		for(var i=0;i<aLi.length;i++){
			aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
			aLi[i].index=i;
			enter(aLi[i]);
			leave(aLi[i]);			
		}
		//渐变显示
		var b=0;
		var timer=setInterval(function(){
			move(aLi[b],{opacity:1},{duration:1000});
			b++;
			if(b==aLi.length)
			{
				clearInterval(timer);
			}
		},200)
		//布局转换
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;	
		}
		oBtn.onmousedown=function(){
			return false;	
		};
		oBtn.onclick=function(){
			aPos.sort(function(){
				return Math.random()-0.5;	
			});	
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],aPos[aLi[i].index]);	
			}
		};
		function enter(obj){
			obj.onmouseover=function(ev){
				var oEvent=ev||event;
				var oSpan=obj.getElementsByTagName('span')[0];
				var oFrom=oEvent.fromElement||oEvent.relatedTarget;
				if(obj.contains(oFrom))return;
				var n=getN(obj,oEvent);
				switch(n){
					case 0:
						oSpan.style.left=w+'px';
						oSpan.style.top=0;
						break;
					case 1:
						oSpan.style.left=w+'px';
						oSpan.style.top=h+'px';
						break;
					case 2:
						oSpan.style.left=0;
						oSpan.style.top=h+'px';
						break;
					case 3:
						oSpan.style.left=-w+'px';
						oSpan.style.top=h+'px';
						break;
					case 4:
						oSpan.style.left=-w+'px';
						oSpan.style.top=0;
						break;
					case 5:
						oSpan.style.left=-w+'px';
						oSpan.style.top=-h+'px';
						break;
					case 6:
						oSpan.style.left=0;
						oSpan.style.top=-h+'px';
						break;
					case 7:
						oSpan.style.left=w+'px';
						oSpan.style.top=-h+'px';
						break;
						
							
				}
				move(oSpan,{left:0,top:0});		
			};	
		}
		function leave(obj){
			obj.onmouseout=function(ev){
				var oEvent=ev||event;
				var oTo=oEvent.toElement||oEvent.relatedTarget;
				if(obj.contains(oTo))return;
				var n=getN(obj,oEvent);
				var oSpan=obj.getElementsByTagName('span')[0];
				switch(n){
					case 0:
						move(oSpan,{left:w,top:0});
						break;
					case 1:
						move(oSpan,{left:w,top:h});
						break;
					case 2:
						move(oSpan,{top:h,left:0});
						break;
					case 3:
						move(oSpan,{left:-w,top:h});
						break;
					case 4:
						move(oSpan,{left:-w,top:0});
						break;
					case 5:
						move(oSpan,{left:-w,top:-h});
						break;
					case 6:
						move(oSpan,{top:-h,left:0});
						break;
					case 7:
						move(oSpan,{left:w,top:-h});
						break;	
				}	
			};	
		}

		function getN (obj,ev){
			var y=obj.offsetHeight/2+obj.getBoundingClientRect().top-ev.clientY;
			var x=obj.offsetWidth/2+obj.getBoundingClientRect().left-ev.clientX;
			var n=Math.round((Math.atan2(y,x)*180/Math.PI+180)/45)%8;
			return n;	
		}
	}
	/*皮肤切换*/
	(function(){
		var Row=5;
		var Col=8;
		var W=document.documentElement.clientWidth;
		var H=document.documentElement.clientHeight;
		var width=W/Col;
		var height=H/Row;
		var bgBox=document.getElementById('bgBox');
		var aSpan=[];
		for (var r=0; r<Row; r++)
		{
			for (var c=0; c<Col; c++)
			{
				var oSpan=document.createElement('span');
				oSpan.style.position='absolute';
				oSpan.style.width=width+'px';
				oSpan.style.height=height+'px';
				var left=c*width;
				var top=r*height;
				
				oSpan.style.left=left+'px';
				oSpan.style.top=top+'px';
				oSpan.style.backgroundSize=('100%*'+Col)+' '+('100%*'+Row);
				oSpan.style.backgroundPosition='-'+left+'px -'+top+'px';
				bgBox.appendChild(oSpan);
				aSpan.push(oSpan);
			}
		}
		var aPath=['#00BFFF','#AB82FF'];
		var oNav=document.getElementById('fp-nav');
		var e=0;
		window.o=true;
		oNav.onclick=function(){
			if(window.o)
			{window.o=false;
				bgNext(e)	
			}
			e++;
			if(e==aPath.length)
			{
				e=0;
			}
		};
		var aNav=oNav.getElementsByTagName('a');
		function bgNext(now)
		{
			for (var i=0; i<aSpan.length; i++)
			{
				aSpan[i].style.opacity=0;
				aSpan[i].style.background=aPath[now];
			}
			var n=0; // 第几个
			var timer=setInterval(function (){
				(function (index){
					move(aSpan[n], {opacity:1}, {
						duration:300,
						complete:function (){
							if (index == aSpan.length-1)
							{
								bgBox.style.background=aPath[now];
							}
						}
					});
				})(n);	
				n++;
				if (n == aSpan.length)
				{
					clearInterval(timer);
					window.o=true;
				}
			}, 30);
		}
	})();
	
	
	/*第四屏-转盘效果*/
	function more()
	{
		var oBtn=document.getElementById('Message');
		var oContact=document.getElementById('contact');
		var oContent=document.getElementById('content');
		var aSpan=oContent.children;
		var R=oContent.offsetWidth/2;
		var n=360/aSpan.length;
		var timer=null;
		move(oContent,{opacity:1},{duration:800,complete:function(){
			for(var i=0;i<aSpan.length;i++){
				(function(index){
					var left=R+R*Math.sin(index*n*Math.PI/180);
					var top=R-R*Math.cos(index*n*Math.PI/180);
					move(aSpan[index],{left:left,top:top},{easing:Tween.Elastic.easeInOut,duration:1000,complete:function(){
						if(index==aSpan.length-1){
							oContent.a=0;
							clearInterval(timer);
							timer=setInterval(function(){
								oContent.a++;
								for(var i=0;i<aSpan.length;i++){
									var left=R+R*Math.sin((i*n+oContent.a)*Math.PI/180);
									var top=R-R*Math.cos((i*n+oContent.a)*Math.PI/180);
									aSpan[i].style.left=left+'px';
									aSpan[i].style.top=top+'px';
								}	
							},30);	
						}	
					}});	
				})(i);						
			}	
		}});	
		oContent.onmouseover=function(){
			clearInterval(timer);	
		};
		oContent.onmouseout=function(){
			clearInterval(timer);
			timer=setInterval(function(){
				oContent.a++;
				for(var i=0;i<aSpan.length;i++){
					var left=R+R*Math.sin((i*n+oContent.a)*Math.PI/180);
					var top=R-R*Math.cos((i*n+oContent.a)*Math.PI/180);
					aSpan[i].style.left=left+'px';
					aSpan[i].style.top=top+'px';
				}	
			},30);	
		};	
	}
	
	
});




