$(document).ready(function(e) {
	var timer;
	var arr=[ 0, 0, 0, 0 ];

	function selectFrom( start, end ){
		return Math.floor( Math.random() * 5 );
	};
	
	/*$(".input").click( function(){
		var min = Math.min.apply( Math, arr );
		var index = arr.indexOf( min );
		var radom = selectFrom( 0, 4 )
		$("<div class='box'></div>").css({
			"top": min,
			"left":index * 25
		}).appendTo(".wrap").addClass( "box" + radom );
		arr[index] += $("div.box"+radom).eq(0).outerHeight();
		
	})*/
	
	
	function tu(){
		var min = Math.min.apply(null, arr ), //取出数组中的最小值
			max = Math.max.apply(null, arr );  //取出数组中的最大值
		var index = $.inArray( min, arr );    //记录数组中最小值的索引
		var radom = selectFrom( 0, 4 );      //0-4的随机数
		var newBox = $("<div class='box'></div>").css({  //向div中添加小div
			"top": max,
			"left": "50px"                 //先添加到中间 再滑动
		}).appendTo(".wrap").addClass( "box" + radom );
		
		arr[index] += $("div.box"+radom).outerHeight();  //令数组的最小值加上刚的小div的高度
		
		$( ".wrap" ).height( max )                //设置大的div的高度
		
		newBox.animate({"top": min, "left": index * 25 }, 1000 );//添加动画效果 min和index记录着应移动到的位置
	};
	
	for(var i = 0; i < 100; i++){     //初始添加100个小div
		tu();
	};
	
	$( window ).scroll( function(){
		var scrollBottom = $( document ).height() - $( window ).height() - $( window ).scrollTop();
		if( scrollBottom - 50 < 0 ){
			for(var i = 0; i < 10; i++){  //如果拖动滚动条 再添加100个小div
				tu();
			};
		}
	})

	

});
