$( document ).ready(function(e) {
    /*$( "#menu li" ).mouseover( function(){
		$( this ).addClass( "hover" );
	});
	$( "#menu li" ).mouseout( function(){
		$( this ).removeClass( "hover" );
	});
	$( "#menu h1" ).click( function(){
		var $next = $( this ).next( "ul" );
		$( "#menu ul" ).removeClass( "show" );
		$( this ).next( "ul" ).addClass( "show" );
		//$next.addClass( "show" );
		
		var uls = $( this ).parent().siblings().children( "ul" );
		$.each( uls, function( index, value ){
			if( $( value ).hasClass( "show" ) ){
				$( value ).removeClass( "show" );
			}
		});
		uls.not( ":hidden" ).removeClass( "show" );
		//console.log( $next.is( ":visible" ) );
		if( $next.is( ":visible" ) ){
			$next.removeClass( "show" );
		}else{
			$next.addClass( "show" );
		}
	});*/
	/*$( "#menu li" ).mouseover( function(){
		$( this ).addClass( "hover" );
	}).mouseout( function(){
		$( this ).removeClass( "hover" );
	});*/
	$( "#menu li" ).hover( function(){
		$( this ).toggleClass( "hover" );
	});
	$( "#menu h1" ).click( function(){
		$( this ).parent().siblings().children( "ul" ).not( ":hidden" ).slideUp( 100 );
		$( this ).next( "ul" ).slideToggle( 100 );
	});
	
});
