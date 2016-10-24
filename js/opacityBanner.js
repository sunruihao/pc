/**
 * Created by sunruihao on 2016/8/18.
 */
(function () {
    var oBox = document.getElementById("box");
    var oBoxInner = oBox.getElementsByTagName("div")[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg = oBoxInner.getElementsByTagName('img');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oBtnLeft = oBox.getElementsByTagName('a')[0];
    var oBtnRight = oBox.getElementsByTagName('a')[1];
    var data = null;
    var timer = null;
    var step = null;
    //获取数据
    getData();
    function getData() {
        var xml = new XMLHttpRequest();
        xml.open("get", "json/data.txt", false);
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonParse(xml.responseText)
            }
        }
        xml.send()
    }
console.log(data)
    //绑定数据
    bind();
    function bind() {
        var strDiv = "";
        var strLi = "";
        for (var i = 0; i < data.length; i++) {
            strDiv += '<div><img realImg="' + data[i].imgSrc + '" alt=""/></div>';
            strLi += i == 0 ? '<li class="on"></li>' : '<li></li>'
        }
        oBoxInner.innerHTML += strDiv;
        oUl.innerHTML += strLi;
    }

    //图片延迟加载
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

    //图片自动显示；
    clearInterval(timer);
    timer = setInterval(autoMove, 1000);
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
                utils.css(aDiv[i], "zIndex", 1)
                animate(aDiv[i], {opacity: 1}, 500, function () {
                    var silbling = utils.siblings(this);
                    for (var i = 0; i < silbling.length; i++) {
                        animate(silbling[i], {opacity: 0})
                    }
                })
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
        utils.css(oBtnLeft, "display", "block")
        utils.css(oBtnRight, "display", "block")
    }
    oBox.onmouseout = function () {
        timer = setInterval(autoMove, 1000);
        utils.css(oBtnLeft, "display", "none")
        utils.css(oBtnRight, "display", "none")
    }
    //handChange
    handChange()
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
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aDiv.length;
        }
        step--;
        setBanner();
    }


})()