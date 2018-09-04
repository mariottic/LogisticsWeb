$(function () {
    $.ajax({
        url: "http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/" + sessionStorage.getItem("transact_number"),
        method: "get",
        success: function (e) {
            if(e.statement!=="1"){
                document.getElementById("d3").style.display="none";
            }
        }
    });
    if(sessionStorage.getItem("sender_address")) {
        document.getElementById("tipinput1").value = sessionStorage.getItem("send_address");

        $.ajax({
            url: "http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/" + sessionStorage.getItem("transact_number"),
            method: "get",
            success: function (e) {

                document.getElementById("tipinput2").value = e.recipent_address;
            }
        });
    }
    else{
        $.ajax({
            url: "http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/" + sessionStorage.getItem("transact_number"),
            method: "get",
            success: function (e) {
                document.getElementById("tipinput1").value = e.sender_address;

                document.getElementById("tipinput2").value = e.recipent_address;
            }
        });
    }

    function change1(id) {
        $.ajax({
            url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/warehouse",
            method:"get",
            async:false,
            success:function (e) {
                for(var i=0;i<e.length;i++) {
                    if (e[i].address.trim() === id.trim()) {
                        sessionStorage.setItem("warehouse_id",e[i].warehouse_id);
                    }
                }
            }
        })
    }
    if(sessionStorage.getItem("sender_address")){
        document.getElementById("tipinput1").value=sessionStorage.getItem("sender_address");
    }
    var mydate = new Date();
    var date=mydate.getFullYear()+"-"+
        (mydate.getMonth()+1)+"-"+ //获取当前月份(0-11,0代表1月)
        mydate.getDate()+" "+ //获取当前日(1-31)
        mydate.getHours()+":"+ //获取当前小时数(0-23)
        mydate.getMinutes()+":"+ //获取当前分钟数(0-59)
        mydate.getSeconds() ;//获取当前秒数(0-59)
    $("#btm1").click(function () {
        change1(document.getElementById("tipinput2").value);
        $.ajax({
            url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/save",
            method:"post",
            data:{
                transact_number:sessionStorage.getItem("transact_number"),
                statement:"2",
                detail_St:"已经到达"+document.getElementById("tipinput2").value+"准备入库.."
            }
        });
        $.ajax({
            url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/sheet/save",
            method:"post",
            data:{
                id:date,
                transact_number:sessionStorage.getItem("transact_number"),
                warehouse_id:sessionStorage.getItem("warehouse_id"),
                date:date,
                flag:"0"
            }
        });
        $.ajax({
            url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/attendance",
            method:"get",
            async:false,
            success:function (e) {
                var k=-1;
                for(var i=0;i<e.length;i++){
                    if(e[i].username===sessionStorage.getItem("username")&&e[i].end_date===null){
                        k=i;
                    }
                }
                if(k!==-1){
                    sessionStorage.setItem("id",e[k].id);
                }
            }
        });

        $.ajax({
            url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/attendance/save",
            method:"post",
            data:{
                id:sessionStorage.getItem("id"),
                end_date:date
            }

        });
        window.location.href="../html/driver.html";
    });
    //基本地图加载

    $("#btm2").click(function () {
        $.ajax({
            url:"http://http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/user_order/save",
            method:"post",
            data:{
                transact_number:sessionStorage.getItem("transact_number"),
                weigh:document.getElementById("w").value,
                fee:document.getElementById("w").value*3
            },
            success:function () {
                $("#btm2").popover('show');
                $("#btm2")[0].disabled="disabled";
            }

        });
    });

    $("#city").change(function () {

        document.getElementById("tipinput2").value=$("#city option:selected").val();
    });

    map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923],//地图中心点
        zoom: 14 //地图显示的缩放级别
    });
    //构造路线导航类
    driving = new AMap.Driving({
        map: map,
        panel: "panel"
    });
    // 根据起终点名称规划驾车导航路线
    driving.search([
        {keyword: document.getElementById("tipinput1").value},
        {keyword: document.getElementById("tipinput2").value}
    ]);
    $("#btm").click(function () {
        map.clearMap();
        $("#panel")[0].innerHTML="";
        var driving = new AMap.Driving({
            map: map,
            panel: "panel"
        });
        // 根据起终点名称规划驾车导航路线
        driving.search([
            {keyword: document.getElementById("tipinput1").value},
            {keyword: document.getElementById("tipinput2").value}
        ]);
    });

});