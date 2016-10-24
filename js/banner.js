/**
 * Created by Administrator on 2016/8/17.
 */
(function(){
    //获取元素
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=oBox.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var btnL=oBox.getElementsByTagName("a")[0];
    var btnR=oBox.getElementsByTagName("a")[1];
    var step=0;
    oBoxInner.innerHTML+='<div><img src="img2/bannne11.jpg" alt=""/></div>';
    utils.css(oBoxInner,'width',aDiv.length*aDiv[0].offsetWidth);
    //1.自动播放的轮播图
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoMove,2200);
    function autoMove(){
        //当我们走到最后一张后，其实看到的是第一张的替身，这个时候，快速的替换为真正的第一张；然后通过step++；再用运动过渡到第二张；
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oBoxInner,'left',0);
            //animate(oBoxInner,{left:0},1000)
        }
        step++; //1 2 3 4
        //utils.css(oBoxInner,'left',-step*1000)//-1000  -2000 -3000 -4000
        animate(oBoxInner,{left:-step*1226});
        banpnerTip();
    }

    //2.焦点自动播放
    function banpnerTip(){
        var tmpStep=step>=aLi.length?0:step;
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i==tmpStep?'on':null;
        }
    }
    //3.移入停止，移出继续
    oBox.onmouseover=function(){
        clearInterval(timer);
        utils.css(btnL,"display","block");
        utils.css(btnR,"display","block")
    }
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000);
        utils.css(btnL,"display","none");
        utils.css(btnR,"display","none")
    }
    //点击停止
    handChange();
    function handChange(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                animate(oBoxInner,{left:-step*1226});
                banpnerTip();
            }
        }
    }
//点击左右进行切换
    btnR.onclick=autoMove;
    btnL.onclick=function(){
        if(step<=0){
            step=aDiv.length-1;
            utils.css(oBoxInner,"left",-step*1226)
        }
        step--;
        animate(oBoxInner,{left:-step*1226});
        banpnerTip();
    }

})()