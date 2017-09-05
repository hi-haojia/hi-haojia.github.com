// JavaScript Document

window.onload=function(){
	
	var oBtn=document.getElementById('gameBtn');
	oBtn.onclick=function(){
		/*按钮消失*/
		this.style.display='none';
		/*游戏初始化*/
		beeGame.init('div1','gameBtn');
	};
	document.onkeydown=function(ev){
		var ev=ev||event;
		if(ev.keyCode==13)
		{
			beeGame.init('div1','gameBtn');
			beeGame.oBtn.style.display='none';
		}
	}
	
};


/*小蜜蜂游戏*/
var beeGame={
	
	/*游戏初始化*/
	init:function(id1,id2){
		/*获取游戏父级*/
		this.oParent=document.getElementById(id1);
		this.oBtn=document.getElementById(id2);
		/*创建积分*/
		this.creatScore();
		/*开始关卡*/
		this.iNow=0;
		/*创建蜜蜂*/
		this.createBee(this.iNow);
		/*创建飞机*/
		this.createAirplane();
	},
	
	/*创建积分*/
	creatScore:function(){
		var oS=document.createElement('p');
		oS.className='score';
		oS.innerHTML='积分:<span>0</span>';
		this.oParent.appendChild(oS);
		/*获取积分和*/
		this.oSum=oS.getElementsByTagName('span')[0];
	},
	
	/*创建蜜蜂*/
	createBee:function(iNow){
		if(this.oUl)
		{
			clearInterval(this.oUl.timer);
			this.oParent.removeChild(this.oUl);
		}
		document.title='第'+(iNow+1)+'关';
		var tollGate=this.tollGate[iNow];
		var oUl=document.createElement('ul');
		oUl.id='bees';
		oUl.style.width=tollGate.colNum*50+'px';
		this.oParent.appendChild(oUl);
		oUl.style.left=(this.oParent.offsetWidth-oUl.offsetWidth)/2+'px';
		for(var i=0;i<tollGate.map.length;i++)
		{
			var oLi=document.createElement('li');
			oLi.className=this.oBee[tollGate.map[i]].style;
			oLi.blood=this.oBee[tollGate.map[i]].blood;
			oLi.speed=this.oBee[tollGate.map[i]].speed;
			oLi.score=this.oBee[tollGate.map[i]].score;
			oUl.appendChild(oLi);
		}
		this.oUl=oUl;
		this.aLi=oUl.getElementsByTagName('li');
		var arr=[];															
		for(var i=0;i<this.aLi.length;i++){
			arr.push([this.aLi[i].offsetLeft,this.aLi[i].offsetTop]);
		}
		for(var i=0;i<this.aLi.length;i++){
			this.aLi[i].style.position='absolute';
			this.aLi[i].style.left=arr[i][0]+'px';
			this.aLi[i].style.top=arr[i][1]+'px';
		}
		
		this.runBees(tollGate);
	},
	
	/*蜜蜂群体移动*/
	runBees:function(tollGate){
		var left=this.oUl.offsetLeft;
		var top=0;
		var maxLeft=this.oParent.offsetWidth-this.oUl.offsetWidth;
		var This=this;
		this.oUl.timer=setInterval(function(){
			left+=tollGate.speedX;
			if(left>maxLeft || left<0){				
				tollGate.speedX*=-1;
				top+=tollGate.speedY;
				This.oUl.style.top=top+'px';
			}
			This.oUl.style.left=left+'px';
		},30);
		setInterval(function(){
			This.runBee();
		},tollGate.lastTime);
	},
	
	/*蜜蜂个体移动*/
	runBee:function(){
		var nowLi=this.aLi[Math.floor(Math.random()*this.aLi.length)];
		if(!nowLi)return;
		var This=this;
		
		var left=nowLi.offsetLeft;
		var top=nowLi.offsetTop;
		nowLi.timer=setInterval(function(){
			var a=(This.oAir.offsetLeft+This.oAir.offsetWidth/2)-(nowLi.offsetLeft+This.oUl.offsetLeft+nowLi.offsetWidth/2);
			var b=(This.oAir.offsetTop+This.oAir.offsetHeight/2)-(nowLi.offsetTop+This.oUl.offsetTop+nowLi.offsetHeight/2);
			var c=Math.sqrt(a*a+b*b);
			var spX=nowLi.speed*a/c;
			var spY=nowLi.speed*b/c;
			if(b<20)
			{
				spX+=spX>0?3:-3;	
				spY=5;
			}
			left+=spX;
			top+=spY;
			nowLi.style.left=left+'px';
			nowLi.style.top=top+'px';
			if(top>This.oParent.offsetHeight)
			{
				top=-This.oUl.offsetTop;
			}
			if(This.touchTest(This.oAir,nowLi))
			{
				alert('游戏结束了!');
				window.location.reload();
			}
		},30);
	},
	
	/*创建飞机*/
	createAirplane:function(iNow){
		var oAir=document.createElement('div');
		oAir.className=this.airplane.style;
		this.oParent.appendChild(oAir);
		oAir.style.left=(this.oParent.offsetWidth-oAir.offsetWidth)/2+'px';
		oAir.style.top=this.oParent.offsetHeight-oAir.offsetHeight+'px';
		this.oAir=oAir;
		this.runAir();
	},
	
	/*飞机移动*/
	runAir:function(){
		var This=this;
		var timer=null;
		var speed=0;
		var left=This.oAir.offsetLeft;
		var maxLeft=This.oParent.offsetWidth-This.oAir.offsetWidth;
		var a=false;
		var b=false;
		document.onkeydown=function(ev){
			var ev=ev||event;
			if(ev.keyCode==37)
			{
				a=true;
				speed=-This.airplane.speed;
			}
			else if(ev.keyCode==39)
			{
				b=true;
				speed=This.airplane.speed;
			}else{
				return;
			}
			if(!timer)
			{
				timer=setInterval(show,30);
			}
			function show()
			{
				if(left<0)
				{
					left=0;
				}
				else if(left>maxLeft)
				{
					left=maxLeft;
				}
				left+=speed;
				This.oAir.style.left=left+'px';
			}	
		};
		document.onkeyup=function(ev){
			var ev=ev||event;
			if(ev.keyCode==37)
			{
				a=false;
			}
			else if(ev.keyCode==39)
			{
				b=false;
			}
			if(!a&&!b)
			{
				clearInterval(timer);
				timer=null;
			}	
			
			if(ev.keyCode==32)
			{
				This.creatBullet();
			}
			if(ev.keyCode==80)
			{
				alert('暂停了!');
			}
		};
	},
	
	/*创建子弹*/
	creatBullet:function(){
		var oBullet=document.createElement('div');					
		oBullet.className=this.airplane.bulletStyle;
		oBullet.style.width=this.airplane.bulletWidth+'px';
		this.oParent.appendChild(oBullet);
		oBullet.style.left=this.oAir.offsetLeft+this.oAir.offsetWidth/2-oBullet.offsetWidth/2+'px';
		oBullet.style.top=this.oAir.offsetTop-oBullet.offsetHeight+'px';
		this.runBullet(oBullet);
	},
	
	/*子弹运动*/
	runBullet:function(oBullet){
		var This=this;
		var top=oBullet.offsetTop;
		oBullet.timer=setInterval(function(){
			top-=10;
			if(top<=-oBullet.offsetHeight)
			{
				clearInterval(oBullet.timer);
				This.oParent.removeChild(oBullet);
			}
			oBullet.style.top=top+'px';
			for(var i=0;i<This.aLi.length;i++)
			{
				if(This.touchTest(oBullet,This.aLi[i]))
				{
					if(This.aLi[i].blood==1)
					{
						clearInterval(This.aLi[i].timer);
						This.oSum.innerHTML=parseInt(This.oSum.innerHTML)+This.aLi[i].score;
						This.oUl.removeChild(This.aLi[i]);
						if(This.aLi.length==0)
						{
							This.iNow++;
							This.oBtn.innerHTML='进入第'+(This.iNow+1)+'关';
							This.oBtn.onclick=null;
							This.oBtn.style.display='block';
							var timer=null;
							timer=setInterval(function(){
								This.oBtn.style.display='none';
								This.createBee(This.iNow);
								clearInterval(timer);
							},3000);
						}
					}else{
						This.aLi[i].blood--;
					}
					clearInterval(oBullet.timer);
					This.oParent.removeChild(oBullet);
				}
			}
		},30);
	},
	
	/*碰撞检测*/
	touchTest:function(obj1,obj2){
		var T1=obj1.offsetTop+2;
		var B1=obj1.offsetTop+obj1.offsetHeight;
		var L1=obj1.offsetLeft;
		var R1=obj1.offsetLeft+obj1.offsetWidth;
		
		var T2=obj2.offsetTop+obj2.parentNode.offsetTop;		
		var B2=obj2.offsetTop+obj2.offsetHeight+obj2.parentNode.offsetTop;
		var L2=obj2.offsetLeft+obj2.parentNode.offsetLeft;
		var R2=obj2.offsetLeft+obj2.offsetWidth+obj2.parentNode.offsetLeft;
		
		if(T1>B2 || B1<T2 || L1>R2 || R1<L2){
			return false;
		}else{
			return true;
		}
	},
	
	/*蜜蜂数据*/
	oBee:{
		b1:{ style: 'bee1', blood: 1, speed: 5, score: 1 },
		b2:{ style: 'bee2', blood: 2, speed: 7, score: 2 },
		b3:{ style: 'bee3', blood: 3, speed: 9, score: 3 },
		b4:{ style: 'bee4', blood: 4, speed: 11, score: 4 }
	},
	
	/*关卡数据*/
	tollGate:[
		{						//第一关
			map:[
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1'
			],
			colNum:10,
			speedX:3,
			speedY:3,
			lastTime:3000
		},
		{						//第二关
			map:[
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1'
			],
			colNum:10,
			speedX:3,
			speedY:5,
			lastTime:2000
		},
		{						//第三关
			map:[
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1'
			],
			colNum:10,
			speedX:3,
			speedY:5,
			lastTime:2000
		},
		{						//第四关
			map:[
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2'
			],
			colNum:10,
			speedX:4,
			speedY:7,
			lastTime:2000
		},
		{						//第五关
			map:[
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3',
				'b3','b3','b3','b3','b3','b3','b3','b3','b3','b3'
			],
			colNum:10,
			speedX:5,
			speedY:7,
			lastTime:2000
		},
		{						//第六关
			map:[
				'b4','b4','b4','b4','b4'
			],
			colNum:5,
			speedX:5,
			speedY:7,
			lastTime:2000
		},
		{						//第七关
			map:[
				'b4','b4','b4','b4',
				'b4','b4','b4','b4'
			],
			colNum:4,
			speedX:5,
			speedY:7,
			lastTime:2000
		},
		{						//第八关
			map:[
				'b4','b4','b4','b4',
				'b4','b4','b4','b4',
				'b4','b4','b4','b4'
			],
			colNum:4,
			speedX:5,
			speedY:7,
			lastTime:3000
		}
	],
	
	/*飞机数据*/
	airplane: {			//飞机的数据
		style: 'airplane',
		speed: 10,
		bulletStyle: 'bullet',
		bulletWidth: 2
	}
};