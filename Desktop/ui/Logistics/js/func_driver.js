function change(id) {
    $.ajax({
        url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/warehouse/"+id,
        method:"get",
        success :function (e) {
            sessionStorage.removeItem("sender_address");
            sessionStorage.setItem("sender_address",e.address);

        }
    });
}

function a(i) {

    var mydate = new Date();
    var date=mydate.getFullYear()+"-"+
        (mydate.getMonth()+1)+"-"+ //获取当前月份(0-11,0代表1月)
        mydate.getDate()+" "+ //获取当前日(1-31)
        mydate.getHours()+":"+ //获取当前小时数(0-23)
        mydate.getMinutes()+":"+ //获取当前分钟数(0-59)
        mydate.getSeconds() ;//获取当前秒数(0-59)
    var number;
    number="00"+mydate.getFullYear()+""+
        (mydate.getMonth()+1)+""+ //获取当前月份(0-11,0代表1月)
        mydate.getDate()+""+ //获取当前日(1-31)
        mydate.getHours()+""+ //获取当前小时数(0-23)
        mydate.getMinutes()+""+ //获取当前分钟数(0-59)
        mydate.getSeconds()+"" ;//获取当前秒数(0-59)
    sessionStorage.setItem("transact_number",i);
    $.ajax({
        url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/save/",
        method:"post",
        // asyn:false,
        data:{
            transact_number:i,
            statement:"1",
            detail_St:"正在配送中"
        }

    });
    $.ajax({
        url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/attendance/save/",
        method:"post",
        data:{
            id:number,
            transact_number:i,
            username:document.getElementById("user").innerText,
            start_date:date
        }
    });
    window.location.href="../html/driverLine.html";

}
function b(i) {
    sessionStorage.removeItem("transact_number");
    sessionStorage.setItem("transact_number", i);
    var l=new Array();
    $.ajax({
        url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/"+i,
        method: "get",
        // asyn:false,
        success:function (e) {
            if(e.statement==="3") {
                $("'#"+sessionStorage.getItem("transact_number")+"'").popover("show");
            }
            else if(e.statement==="4"){
                $.ajax({
                    url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/sheet" ,
                    method:"get",
                    success:function (d) {
                        for(var k=0;k<d.length;k++){
                            if(d[k].transact_number===i&&d[k].type==="出库"){
                                l.push(d[k]);
                            }
                        }
                    }
                });
                change(l.pop().warehouse_id);
                window.location.href="../html/driverLine.html";
            }
            else{
                $.ajax({
                    url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/save",
                    method:"post",
                    data:{
                        id:i,
                        statement:"2"
                    }
                });
                window.location.href="../html/driverLine.html";
            }
        }

    });


}
function c(i) {
    sessionStorage.removeItem("transact_number");
    sessionStorage.setItem("transact_number", i.id);
    var l=new Array();
    $.ajax({
        url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/"+i.id,
        method: "get",
        // asyn:false,
        success:function (e) {
            if(e.statement==="3") {
                $(i).popover("show");
            }
            else if(e.statement==="4"){
                $.ajax({
                    url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/sheet" ,
                    method:"get",
                    success:function (d) {
                        for(var k=0;k<d.length;k++){
                            if(d[k].transact_number===i.id&&d[k].type==="出库"){
                                l.push(d[k]);
                            }

                        }

                        change(l.pop().warehouse_id);
                        window.location.href="../html/driverLine.html";
                    }

                });

            }
            else{
                window.location.href="../html/driverLine.html";
            }
        }

    });


}
$(function () {

    $(document).ajaxStart(function a() {

        $("#user")[0].innerHTML=sessionStorage.getItem("username")

    });
    $.ajax({
        url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/attendance",
        method:"get",
        success:function (e) {
            var k=-1;
            for(var i=0;i<e.length;i++){
                if((e[i].username===sessionStorage.getItem("username")&&e[i].end_date===null))k=i;
            }
            if(k!==-1){
                $("#mission_list")[0].style.display="none";
                $("#d1").append("<table style='margin:auto;text-align:center;' border='1px'><tr><td colspan='2'>您有未完成的订单,请确认完成后才能开始下一个任务</td></tr><tr><td>订单号</td><td>前往</td><tr><td>"+ e[k].transact_number + "</td><td><button  data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\"请先等待快件出库后才能接受任务\"  id='" + e[k].transact_number
                    + "' onclick='b(this.id)'>前往您的订单</button></td></tr></table>");
            }

            else{
                $.ajax({
                    url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order",
                    method:"get",
                    success:
                        function (e) {
                            var r = 0;
                            for(var i=0;i<e.length;i++) {

                                if (e[i].statement === "0") {
                                    $("#mission_list").append("<tr><td>" + e[i].transact_number + "</td><td>" + e[i].sender_address + "</td>+<td>" + e[i].recipent_address + "</td><td><button data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\"请先等待快件出库后才能接受任务\" id='" + e[i].transact_number
                                        + "' onclick='a(this.id)'>click</button></td>");
                                }
                                else if (e[i].statement==="3"||e[i].statement==="4") {
                                    $("#mission_list").append("<tr><td>" + e[i].transact_number + "</td><td>" + e[i].sender_address + "</td>+<td>" + e[i].recipent_address + "</td><td><button data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\"请先等待快件出库后才能接受任务\"  id='" + e[i].transact_number
                                        + "' onclick='c(this)'>click</button></td>");
                                }
                                else {
                                    r++;
                                }
                            }
                            if(r===e.length){
                                $("#mission_list")[0].style.display="none";
                                $("#d1")[0].innerHTML="no task!";
                            }
                        }

                });

            }
        }
    })
});

function link1() {
    $("#d1")[0].innerHTML="";
    $("#d1").append("<table border='1px' id='mission_list' style='margin:auto;text-align: center;' ><tr>任务列表</tr><tr><td>订单号</td><td>寄件地址</td><td>收货地址</td><td>接受</td></tr></table>");
    $.ajax({
        url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/attendance",
        method:"get",
        success:function (e) {
            var k=-1;
            for(var i=0;i<e.length;i++){
                if((e[i].username===sessionStorage.getItem("username")&&e[i].end_date===null))k=i;
            }
            if(k!==-1){
                $("#mission_list")[0].style.display="none";
                $("#d1").append("<table style='margin:auto;text-align:center;' border='1px'><tr><td colspan='2'>您有未完成的订单,请确认完成后才能开始下一个任务</td></tr><tr><td>订单号</td><td>前往</td><tr><td>"+ e[k].transact_number + "</td><td><button id='" + e[k].transact_number
                    + "' onclick='b(this.id)'>前往您的订单</button></td></tr></table>");
            }


            else{
                $.ajax({
                    url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order",
                    method:"get",
                    success:
                        function (e) {
                            var r = 0;
                            for(var i=0;i<e.length;i++) {

                                if (e[i].statement === "0"||e[i].statement==="3"||e[i].statement==="4") {
                                    $("#mission_list").append("<tr><td>" + e[i].transact_number + "</td><td>" + e[i].sender_address + "</td>+<td>" + e[i].recipent_address + "</td><td><button id='" + e[i].transact_number
                                        + "' onclick='a(this.id)'>click</button></td>");
                                }
                                else {
                                    r++;
                                }
                            }
                            if(r===e.length){
                                $("#mission_list")[0].style.display="none";
                                $("#d1").append("<h1>任务列表</h1><br/>暂时没有任务!")
                            }
                        }

                });

            }
        }
    })

}
function link2() {
    $("#d1")[0].innerHTML="";
    $("#d1").append("<table border='1px' id='attendance_list' style='margin:auto;text-align: center;' ><tr>出勤列表</tr><tr><td>出勤号</td><td>订单号</td><td>开始时间</td><td>结束时间</td></tr></table>");
    $.ajax({
        url:"http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/attendance",
        method:"get",
        success:function (e) {
            for(var i=0;i<e.length;i++){

                if(e[i].username===sessionStorage.getItem("username")&&e[i].end_date===null)  { $("#attendance_list").append("<tr><td>" + e[i].id + "</td><td>" + e[i].transact_number + "</td>+<td>" + e[i].start_date + "</td><td>您的任务未完成</td>");}
                if(e[i].username===sessionStorage.getItem("username")&&e[i].end_date!==null)  { $("#attendance_list").append("<tr><td>" + e[i].id + "</td><td>" + e[i].transact_number + "</td>+<td>" + e[i].start_date + "</td><td>"+e[i].end_date+"</td>");}

            }
        }
    });
}
