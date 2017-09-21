// ActionScript Document

//头部选项卡
window.onload = function(){
	//选项卡调用
	var aTab = getByClass(document,'j-tab');
	for(var i=0; i<aTab.length; i++)
	{
		tab(aTab[i]);
	}
	
	//广告延时关闭
	(function(){
		var aAd = getByClass(document,'ad')[0];
		var timer=null; //全局
		var closeBtn = document.getElementById('closeAd');
		timer=setTimeout(function(){
			aAd.style.display='none';	
		},5000);
		aAd.onmouseover=function(){
			clearTimeout(timer);	
		};
		aAd.onmouseout=function(){
			timer=setTimeout(function(){
				aAd.style.display='none';	
			},3000);	
		};
		closeBtn.onclick = function(){
			aAd.style.display='none';	
		};	
	})();
	
	//点击改变内容
	(function(){
		var ochoice = getByClass(document,'choice')[0];
		var aEm = ochoice.getElementsByTagName('em');
		var oDiv = ochoice.getElementsByTagName('div')[0];
		aEm[0].onclick = function(){
			var sTem = aEm[1].innerHTML;
			aEm[1].innerHTML = this.innerHTML;
			this.innerHTML=sTem;
			oDiv.className='j-box';
		};
		aEm[1].onclick = function(){
			var sTem = aEm[0].innerHTML;
			aEm[0].innerHTML = this.innerHTML;
			this.innerHTML=sTem;
			oDiv.className='j-box';
		};
	})();
	//搜索框js
	var oSearchBtn = document.getElementById('searchBtn');
	var oTxt = document.getElementById('txt');
	//改变搜索框内容
	(function(){
		
		oSearchBtn.onclick = oTxt.onfocus = function(){
			oSearchBtn.style.display='none';	
			oTxt.focus();
		};
		var oDiv = getByClass(document,'option-list')[0];	
		var aList = oDiv.getElementsByTagName('a');
		
		for(var i=0; i<aList.length; i++)
		{
			aList[i].onclick = function(){
				oSearchBtn.innerHTML=this.innerHTML;	
			};
		}
		oTxt.onblur = function(){
			if(oTxt.value=='')
			{
				oSearchBtn.style.display='block';
			}	
		};
	})();
	
	//自动播放选项卡
	var aShow = getByClass(document,'j-show');
	var oUl = getByClass(document,'hot-food');
	for(var i=0; i<aShow.length; i++)
	{
		aShow[i].onmouseover= function(){
			this.className = 'active j-show';
		};
		aShow[i].onmouseout= function(){
			this.className = ' j-show';
		};
	}
	function showNext (index,num,x,s)
	{
		var aNext = getByClass(aShow[index],'next');
		var aPrev = getByClass(aShow[index],'prev');
		var oUl = getByClass(aShow[index],'j-ul')[0];
		var n=0;
		var timer=null;
		timer=setInterval(function(){
			next();	
		},s);
		
		aNext[0].onclick =function(){
			clearInterval(timer);
			next();
		}; 
		
		function next(){
			n++;
			if(n>x)
			{
				n=0;
			}
			oUl.style.left= -num*n+'px';
			x==1 ? aNext[0].innerHTML='' : aNext[0].innerHTML = n+1+'/'+(x+1);
		};
		aPrev[0].onclick = function(){
			clearInterval(timer);
			n--;
			if(n<0)
			{
				n=x;
			}	
			oUl.style.left= -num*n+'px';
			x==1 ? aNext[0].innerHTML='' : aNext[0].innerHTML = n+1+'/'+(x+1);
		};
			
	}
	//自动播放选项卡结束
	
	showNext(0,708,2,3000);
	showNext(1,186,1,2000);
	showNext(2,1170,2,5000);
	
	
	
		
	//选项卡
	function tab(oParent)
	{
		var aBtn = getByClass(oParent,'j-btn');
		var aDiv = getByClass(oParent,'j-box');
		
		for(var i=0; i<aBtn.length; i++)
		{
			(function(index){
				var timer=null;
				aBtn[i].onmouseover = aDiv[index].onmouseover = function(){
					clearTimeout(timer);
					timer=setTimeout(function(){
						aBtn[index].className= 'active j-btn';
						aDiv[index].className='j-box active';
					},100);
				};
				aBtn[i].onmouseout = aDiv[index].onmouseout= function(){
					clearTimeout(timer);
					timer= setTimeout(function(){
						for(var i=0; i<aBtn.length; i++)
						{
							aBtn[i].className='j-btn';
							aDiv[i].className='j-box';
						}	
					},100);
						
				};
			})(i);
		}
	}


};

function getByClass(oParent,sName)
{
	
	if(oParent.getElementsByClassName)  
	{
		return oParent.getElementsByClassName(sName);
	}
	else
	{
		var aChild =oParent.getElementsByTagName('*');
		var aRes =[];
		for(var i=0; i<aChild.length; i++)
		{
			var ojb = aChild[i];
			var str = ojb.className;
			var arr = str.split(' ');
			
			for(var j=0; j<arr.length; j++)
			{
				arr[j]==sName && aRes.push(ojb);
			}
		
		}
		return aRes;
	}
}	