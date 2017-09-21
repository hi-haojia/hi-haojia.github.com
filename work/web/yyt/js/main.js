// 音悦台聚焦
window.onload=function(){
	var aBtnlist=document.getElementById('btnlist');
    var aList=aBtnlist.getElementsByTagName('a');
	var  aTdiv=document.getElementById('tabbox');
	var  oTimg=aTdiv.getElementsByTagName('img');
	var  oBdiv=document.getElementById('box');
	var aRul=document.getElementById('area');
	var aRa=aRul.getElementsByTagName('a');
	var aRi=aRul.getElementsByTagName('i');
	var aSdiv=document.getElementById('list');
	var aSul=aSdiv.getElementsByTagName('ul');
	//我不知会遇见你
	for(var i=0;i<aList.length;i++){
		aList[i].index=i;
		aList[i].onclick=function(){
			for(var i=0;i<aList.length;i++){
		    oTimg[i].style.display='none';
			aList[i].className='';
				}
		    oTimg[this.index].style.display='block';
			this.className='active';
			}
		}
		//打榜动态
	for(var i=0;i<aRa.length;i++){
		aRa[i].index=i;
		aRa[i].onmouseover=function(){
			for(var i=0;i<aRa.length;i++){
				aSul[i].style.display='none';
				aRi[i].style.display='none';
				aRa[i].className='';
				}
			aSul[this.index].style.display='block';
			aRi[this.index].style.display='block';
			this.className='active1';
			}
		}
	}