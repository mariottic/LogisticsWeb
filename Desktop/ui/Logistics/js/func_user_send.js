var code ; //在全局定义验证码  

function createCode(){
    code = "";
    var codeLength = 4;//验证码的长度 
    var checkCode = document.getElementById("code");
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
        'S','T','U','V','W','X','Y','Z');//随机数 
    for(var i = 0; i < codeLength; i++) {//循环操作 
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35） 
        code += random[index];//根据索引取得随机数加到code上 
    }
    checkCode.value = code;//把code值赋给验证码 
}
function check_name() {
    var Name=document.form1.recipent_name.value;
    var nameReg=/^[\u4e00-\u9fa5A-Za-z]{2,20}$/;

    if(Name!=="") {
        if (!nameReg.test(Name)) {
            $("#check_name")[0].innerHTML="invalid name!";
        }
        else {
            $("#check_name")[0].innerHTML='&nbsp';
        }
    }
    else{
        $("#check_name")[0].innerHTML='&nbsp';
    }
}
function check_fixedline() {
    var fixedline=document.form1.recipent_fixedline.value;
    var fixedlineReg=(/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/)
    if(fixedline!=="") {
        if (!fixedlineReg.test(fixedline)) {
            $("#check_fixedline")[0].innerHTML="invalid fixedLine!";
        }
        else {
            $("#check_fixedline")[0].innerHTML='&nbsp';
        }
    }
    else{
        $("#check_fixedline")[0].innerHTML='&nbsp';
    }
}
function check_code(){
    var inputCode = document.form1.certificaiton_code.value.toUpperCase(); //取得输入的验证码并转化为大写    

    if(inputCode !== code ) { //若输入的验证码与产生的验证码不一致时 
        document.form1.certificaiton_code.focus();
        createCode();//刷新验证码 
        // document.form1.certificaiton_code.value = "";//清空文本框 
        $('#certificaiton_code').popover('show');

    }
}
function check_phone_number() {


    var Phone_number = document.form1.recipent_phone_number.value;
    var phoneReg = /^1[34578]\d{9}$/;
    //电话
    var phone = $.trim(Phone_number);
    if(Phone_number!=="") {
        if (!phoneReg.test(phone)) {
            $("#check_phone_number")[0].innerHTML="invalid number!";
        }
        else {
            $("#check_phone_number")[0].innerHTML='&nbsp';
        }

    }
    else{
        $("#check_phone_number")[0].innerHTML='&nbsp';
    }
}

$(document).ready(function () {
    $.ajax({
        url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/account/"+sessionStorage.getItem("username"),
        method: "get",
        success: function (e) {
            document.form1.sender_name.value=e.name;
            document.form1.sender_phone_number.value=e.sender_phone_number;
        }
    });
    var url=window.location.href;
    if(url.split("?").length>1) {
        document.form1.sender_address.value=decodeURI(url.split("?")[1].split("&")[0].split("=")[1]);
        document.form1.recipent_address.value=decodeURI(url.split("?")[1].split("&")[1].split("=")[1]);
    }
    // var code ; //在全局定义验证码  
    //
    // function createCode(){
    //     code = "";
    //     var codeLength = 4;//验证码的长度 
    //     var checkCode = document.getElementById("code");
    //     var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
    //         'S','T','U','V','W','X','Y','Z');//随机数 
    //     for(var i = 0; i < codeLength; i++) {//循环操作 
    //         var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35） 
    //         code += random[index];//根据索引取得随机数加到code上 
    //     }
    //     checkCode.value = code;//把code值赋给验证码 
    // }

    function validate_number() {
        if(($("#recipent_phone_number").val()==="")&&($("#repcipent_fixedline").val()==="")){
            $("#need_validate")[0].style.display="block";
        }
    }


    $.ajax({
        url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/account/"+sessionStorage.getItem("username"),
        method:"get",
        success:function (e) {
            $("#sender_name").val(e.name);
            document.form1.sender_phone_number.value=e.phone_number;
        }
    });
    $('#down').click(function(){
        if($('#input').val()>0.5) {
            $('#input').val($('#input').val() - 0.5);
        }

    });

    $('#up').click(function(){

        $('#input').val(parseFloat($('#input').val())+0.5);


    });
    $("#orderBtm").click(function () {
        event.preventDefault();
        var number;
        var mydate = new Date();
        number=842+""+mydate.getFullYear()+""+
            (mydate.getMonth()+1)+""+ //获取当前月份(0-11,0代表1月)
            mydate.getDate()+""+ //获取当前日(1-31)
            mydate.getHours()+""+ //获取当前小时数(0-23)
            mydate.getMinutes()+""+ //获取当前分钟数(0-59)
            mydate.getSeconds()+"" ;//获取当前秒数(0-59)
        $("#transact_number").val(number);
        var transact_number=document.form1.transact_number.value;
        var sender_name=document.form1.sender_name.value;
        var sender_address=document.form1.sender_address.value;
        var sender_phone_number=document.form1.sender_phone_number.value;
        var recipent_address=document.form1.recipent_address.value;
        var recipent_phone_number=document.form1.recipent_phone_number.value;
        var recipent_fixedline=document.form1.recipent_fixedline.value;
        if(sender_address===""||recipent_address===""){
            $('#btm').focus();
            $('#btm').popover('show');
        }

        if((transact_number!=="")&&(sender_name!=="")&&(sender_address!=="")&&(sender_phone_number!=="")&&(recipent_address!=="")&&((recipent_phone_number!=="")||(recipent_fixedline!==""))) {
            $.ajax({
                url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/save",
                method: "post",
                data: decodeURI($("form").serialize()),

                success: function () {
                    alert("success");
                    window.location.href="../html/user.html"
                }
            });
        }


    });


    createCode();
});
