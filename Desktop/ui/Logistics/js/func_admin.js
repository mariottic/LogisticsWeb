var mydate = new Date();
var date=mydate.getFullYear()+"-"+
    (mydate.getMonth()+1)+"-"+ //获取当前月份(0-11,0代表1月)
    mydate.getDate()+" "+ //获取当前日(1-31)
    mydate.getHours()+":"+ //获取当前小时数(0-23)
    mydate.getMinutes()+":"+ //获取当前分钟数(0-59)
    mydate.getSeconds() ;//获取当前秒数(0-59)

function a(id) {
    $.ajax({

        url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet/"+id,
        method:"get",
        success:function (e) {
            $.ajax({
                url: "http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet/save",
                method: "post",
                async: false,
                data: {
                    id: id,
                    type: "入库",
                    transact_number:e.transact_number

                }
            });
            $.ajax({
                url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTuser_order/save",
                method:"post",
                data:{
                    transact_number:e.transact_number,
                    statement:"3",
                    detail_St:"已在"+sessionStorage.getItem("address")+"入库成功!"
                }
            });
        }
    });

    // $("#l1").click();
    window.location.reload();
}
function b(id) {
    var c;
    var d;
    $.ajax({
        url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet/"+id,
        method:"get",
        success:function (e) {
            c=e.transact_number;
            d=e.warehouse_id;
            sessionStorage.removeItem("address");
            change(d);
            $.ajax({
                url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet/save",
                method:"post",
                data:{
                    id:date,
                    date:date,
                    warehouse_id:d,
                    transact_number:c,
                    type:"出库",
                    flag:"1"
                }

            });
            $.ajax({
                url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet/save",
                method:"post",
                data:{
                    id:id,
                    flag:"1"
                }
            });
            $.ajax({
                url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTuser_order/save",
                method:"post",
                data:{
                    transact_number:c,
                    statement:"4",
                    detail_St:"已在"+sessionStorage.getItem("address")+"出库成功"
                }
            });
        }
    });
    window.location.reload();

}
function change(id) {
    $.ajax({
        url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTwarehouse",
        method:"get",
        async:false,
        success:function (e) {
            for(var i=0;i<e.length;i++){
                if(e[i].warehouse_id===id){
                    sessionStorage.setItem("address", e[i].address);
                }
            }

        }
    })
}
function link1() {
    $("#d1")[0].innerHTML="";
    $.ajax({
        url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet",
        method:"get",
        success:function (e) {
            var k=0;
            $("#d1").append("<table border='1px' id='entry_list' style='margin:auto;text-align: center;' ><tr><h3>需要入库的快件</h3></tr><tr><td>订单号</td><td>目前所在地</td><td>确认</td></tr></table>\n");
            for(var i=0;i<e.length;i++){
                if(e[i].type===null){
                    sessionStorage.removeItem("address");
                    change(e[i].warehouse_id);
                    $("#entry_list").append("<tr><td>"+e[i].transact_number+"</td><td>"+ sessionStorage.getItem("address")+"</td><td><button id='"+e[i].id+"' onclick='a(this.id)'>"+"入库</button></td></tr>");
                    k++;
                }
            }
            if(k===0){
                $("#d1")[0].innerHTML="";
                $("#d1").append("<h3>需要入库的快件</h3><br/>暂时没有需要入库的快件");
            }
        }
    });
}
function link2() {
    $("#d1")[0].innerHTML="";
    $.ajax({
        url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOTsheet",
        method:"get",
        success:function (e) {
            var k=0;
            $("#d1").append("<table border='1px' id='out_list' style='margin:auto;text-align: center;' ><tr><h3>需要出库的快件</h3></tr><tr><td>订单号</td><td>目前所在地</td><td>确认</td></tr></table>\n");
            for(var i=0;i<e.length;i++){
                if(e[i].type==="入库"&&e[i].flag==="0"){
                    sessionStorage.removeItem("address");
                    change(e[i].warehouse_id);
                    $("#out_list").append("<tr><td>"+e[i].transact_number+"</td><td>"+sessionStorage.getItem("address")+"</td><td><button id='"+e[i].id+"' onclick='b(this.id)'>"+"出库</button></td></tr>");
                    k++;
                }
            }
            if(k===0){
                $("#d1")[0].innerHTML="";
                $("#d1").append("<h3>需要出库的快件</h3><br/>暂时没有需要出库的快件");
            }
        }
    })

}


