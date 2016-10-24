/**
 * Created by sunruihao on 2016/9/2.
 */
(function(){
    //获取元素
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=oBox.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var btnL=document.getElementById("btnLeft");
    var btnR=document.getElementById("btnRight");
    var step=0;
    var timer=null;
    lazyImg();
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var tmpImg = new Image;
                tmpImg.src = aImg[index].getAttribute("realImg");
                tmpImg.onload = function () {
                    aImg[index].src = this.src;
                    var aDiv1 = aDiv[0];
                    utils.css(aDiv1, "zIndex", 1)
                    animate(aDiv1, {opacity: 1}, 500)
                }
            })(i)
        }
    }
    clearInterval(timer);
    timer = setInterval(autoMove, 1500);
    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aDiv.length; i++) {
            if (i === step) {
                utils.css(aDiv[i], "zIndex", 1);
                animate(aDiv[i], {opacity: 1}, 500, function () {
                    var silbling = utils.siblings(this);
                    for (var i = 0; i < silbling.length; i++) {
                        animate(silbling[i], {opacity: 0})
                    }
                });
                continue;
            }
            utils.css(aDiv[i], "zIndex", 0)
        }
        bannerTip();
    }

    //焦点自动播放
    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = i == step ? "on" : null;
        }
    }

    //鼠标移入移出
    oBox.onmouseover = function () {
        clearInterval(timer);
        utils.css(btnL, "display", "block");
        utils.css(btnR, "display", "block")
    };
    oBox.onmouseout = function () {
        timer = setInterval(autoMove, 1400);
        utils.css(btnL, "display", "none");
        utils.css(btnR, "display", "none");
    };
    //handChange
    handChange();
    function handChange(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                setBanner();
            }
        }
    }
    //点击左右切换
    btnR.onclick=autoMove;
    btnL.onclick=function(){
        if(step<=0){
            step=aDiv.length;
        }
        step--;
        setBanner();
    }


})()