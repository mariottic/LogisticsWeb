
$(document).ready(function(){
    document.getElementById("user").innerHTML=sessionStorage.getItem("username");


});
function a(id) {
    $.ajax({
        url:"http://47.93.14.169:8080/user_order/save",
        method:"post",
        data:{

            transact_number:id,
            statement:"5",
            asyn:false,
            detail_St:"已签收"
        }
    });
    window.location.reload();
}
function link1() {
    window.location.href="../html/user_send.html";
}
function link2() {
    $("#d1")[0].innerHTML="";
    $("#d1").append("<table border='1px' id='order_list' style='margin:auto;text-align:center;'><tr>您未确认收件的快件</tr><tr><td>寄给您的快件的订单号</td><td>寄给您的人</td><td>快件物流信息</td><td>确认签收</td></tr></table>");

    $.ajax({
        url:"http://47.93.14.169:8080/account/"+sessionStorage.getItem("username"),
        method:"get",
        success:function (e) {
            sessionStorage.removeItem("recipent_name");
            sessionStorage.setItem("recipent_name",e.name)
        }
    });
    $.ajax({
        url:"http://47.93.14.169:8080/user_order",
        method:"get",
        success:function (e) {
            var k=0;
            for(var i=0;i<e.length;i++){
                if(e[i].recipent_name===sessionStorage.getItem("recipent_name")&&e[i].statement!=="2"&&e[i].statement!=="5"){
                    $("#order_list").append("<tr><td>"+e[i].transact_number+"</td><td>"+e[i].sender_name+"</td><td>"+e[i].detail_St+"</td><td><button onclick='a(this.id)' id"+"='"+e[i].transact_number+"'>确认</button></td></tr>");
                    k++;
                }
            }
            if(k===0){
                $("#d1")[0].innerHTML="";
                $("#d1").append("<h3>您未确认签收的快件</h3><br/>暂时没有您的快件");
            }
        }

    });
}
function link3() {
    $("#d1")[0].innerHTML="";
    $("#d1").append("<table border='1px' id='order_all' style='margin:auto;text-align:center;'><tr><h3>您的所有快件</h3></tr><tr><td>寄给您的快件的订单号</td><td>寄给您的人</td><td>快件物流信息</td></tr></table>");

    $.ajax({
        url:"http://47.93.14.169:8080/account/"+sessionStorage.getItem("username"),
        method:"get",
        success:function (e) {
            sessionStorage.removeItem("recipent_name");
            sessionStorage.setItem("recipent_name",e.name)
        }
    });
    $.ajax({
        url:"http://47.93.14.169:8080/user_order",
        method:"get",
        success:function (e) {
            var k=0;
            for(var i=0;i<e.length;i++){
                if(e[i].sender_name===sessionStorage.getItem("recipent_name")){
                    $("#order_all").append("<tr><td>"+e[i].transact_number+"</td><td>"+e[i].sender_name+"</td><td>"+e[i].detail_St+"</td></tr>");
                    k++;
                }
            }
            if(k===0){
                $("#d1")[0].innerHTML="";
                $("#d1").append("<h3>历史快件</h3><br/>您没有过快件");
            }
        }

    });
}
