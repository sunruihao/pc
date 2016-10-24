/**
 * Created by sunruihao on 2016/8/29.
 */
/*
(function(){
    var tab=document.getElementById("tab");
    var oUl=tab.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var div=tab.getElementsByTagName("div");
    for(var i=0;i<aLi.length;i++){
        (function(index){
            aLi[i].onmouseover=function(){
                for(var j=0;j<aLi.length;j++){
                    aLi[j].className='';
                    div[j].className='';
                }
                aLi[index].className="on";
                div[index].className="show"
            }
            aLi[i].onmouseout=function(){
                aLi[index].className="";
                div[index].className=""
            }

        })(i)
    }
*/

//})()
bai();
function bai(){
    var oT=document.getElementById('t1');
    var oSearch=document.getElementById('search');
    var oUl=document.getElementById('ul');
    var aA=document.getElementsByTagName('a');
    var n=-1;
    var oldValue=null;
    function search(){
        window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
        oT.value='';
    }
    oT.onkeyup=oT.onfocus=function(){
        //一定要先去除文本框中内容的开头和结尾的空格，再判断内容是否存在；
        var str=this.value.replace(/(^ +)|( +$)/g,'');
        oUl.style.display=str?'block':'none';
    };
    document.body.onclick=function(e){
        e.target= e.target|| e.srcElement;
        if(e.target.id=='t1'){
            return;
        }
        if(e.target.tagName.toLowerCase()=='a'){
            oT.value=e.target.innerHTML;
        }
        if(e.target.id=='search'){
            search();
        }
        oUl.style.display='none';
    };
    //down 40 ； up：38  enter:13;
    oT.onkeydown=function(e){
        e=e||window.event;
        if(e.keyCode==40){//往下走；
            n++;
            if(n>=aA.length){
                n=-1;
            }
            list();
        }
        if(e.keyCode==38){//向上走
            n--;
            if(n<=-2){
                n=aA.length-1;
            }
            list();

        }
        if(e.keyCode==13){
            search();
        }
        function list(){
            if(!oldValue){
                oldValue=oT.value;
            }
            for(var i=0; i<aA.length; i++){
                aA[i].style.background='';
            }
            if(n==-1){
                //内容框，恢复以前的旧内容
                oT.value=oldValue;
            }else{
                aA[n].style.background='#e1e1e1';
                oT.value=aA[n].innerHTML;
            }
        }
    }
}