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
		var min = Math.min.apply(null, arr ), //ȡ�������е���Сֵ
			max = Math.max.apply(null, arr );  //ȡ�������е����ֵ
		var index = $.inArray( min, arr );    //��¼��������Сֵ������
		var radom = selectFrom( 0, 4 );      //0-4�������
		var newBox = $("<div class='box'></div>").css({  //��div�����Сdiv
			"top": max,
			"left": "50px"                 //����ӵ��м� �ٻ���
		}).appendTo(".wrap").addClass( "box" + radom );
		
		arr[index] += $("div.box"+radom).outerHeight();  //���������Сֵ���ϸյ�Сdiv�ĸ߶�
		
		$( ".wrap" ).height( max )                //���ô��div�ĸ߶�
		
		newBox.animate({"top": min, "left": index * 25 }, 1000 );//��Ӷ���Ч�� min��index��¼��Ӧ�ƶ�����λ��
	};
	
	for(var i = 0; i < 100; i++){     //��ʼ���100��Сdiv
		tu();
	};
	
	$( window ).scroll( function(){
		var scrollBottom = $( document ).height() - $( window ).height() - $( window ).scrollTop();
		if( scrollBottom - 50 < 0 ){
			for(var i = 0; i < 10; i++){  //����϶������� �����100��Сdiv
				tu();
			};
		}
	})

	

});
