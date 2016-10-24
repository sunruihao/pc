(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var step=0;
    var timer=null;
    oBoxInner.innerHTML+='<div><img src="img/banner1.jpg" alt=""/></div>';
    utils.css(oBoxInner,'width',aDiv.length*aDiv[0].offsetWidth);
    clearInterval(timer)
    timer=setInterval(autoMove,1600)
  function autoMove(){
      if(step>=aImg.length-1){
          step=0;
          utils.css(oBoxInner,"left",0)
      }
      step++;
      animate(oBoxInner,{left:-step*1000})
      bannerTip()

  }
    //焦点自动播放
function bannerTip(){
    var tmpStep=step>=aLi.length?0:step;
    for(var i=0;i<aLi.length;i++){
        aLi[i].className=i==tmpStep?"on":null;
    }




}

//鼠标移入停止 移出播放
    oBox.onmouseover=function(){
        clearInterval(timer)
        utils.css(oBtnLeft,"display","block");
        utils.css(oBtnRight,"display","block");
    }
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,1800)
        utils.css(oBtnLeft,"display","none");
        utils.css(oBtnRight,"display","none");
    }

    // 点击点切换
    handChange();
    function handChange(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                animate(oBoxInner,{left:-step*1000})
                bannerTip();
            }
        }
    }

    //点击左右切换

    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aDiv.length-1;
            utils.css(oBoxInner,"left",-step*1000)
        }
        step--;
        animate(oBoxInner,{left:-step*1000})
        bannerTip();
    }










})()