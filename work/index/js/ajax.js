function ajax(json)
{
	json=json||{};
	if(!json.url)return;
	
	json.data=json.data||{};
	json.type=json.type||'get';
	json.timeout=json.timeout||5000;
	
	var timer=null;
	
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	switch(json.type.toLowerCase())
	{
		case 'get':
			oAjax.open('GET', json.url+'?'+json2url(json.data), true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST', json.url, true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			clearTimeout(timer);
			if(oAjax.status==200)
			{
				json.success &&json.success(oAjax.responseText);
			}
			else
			{
				json.error &&json.error();
			}
		}
	};
	
	timer=setTimeout(function(){
		oAjax.readyState=null;
		alert('超时了');
	},json.timeout);
	
	function json2url(json)
	{
		json.t=Math.random();
		var arr=[];
		for(var name in json)
		{
			arr.push(name+'='+json[name]);
		}
		return arr.join('&');
	}
}
