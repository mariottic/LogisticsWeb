function change1() {

    document.getElementById("change").value=0;
    change=document.getElementById("change").value;
}
function change2() {
    document.getElementById("change").value=1;
    change=document.getElementById("change").value;

}



$(function () {
    tipinput1= document.getElementById("tipinput1").value;
    tipinput2= document.getElementById("tipinput2").value;
    change=document.getElementById("change").value;
    vs=document.getElementById("vs").value;
    function geocoder_CallBack(data) {
        var address = data.regeocode.formattedAddress;
        //返回地址描述
        if(document.getElementById("change").value==="0"){document.getElementById("tipinput1").value=address;}
        else if(document.getElementById("change").value==="1") {
            document.getElementById("tipinput2").value = address;
        }
    }

//初始化地图
     map = new AMap.Map("container", {
        resizeEnable: true,
        zoom:15
    });
    var send_markers=[];
    var reci_markers=[];

//定位浏览位置
    map.plugin(['AMap.Geolocation','AMap.Geocoder'], function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

    });
    function onComplete(data) {
        var str=['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        address=[data.position.getLng(),data.position.getLat()];
        console.log(address);
        // 定位信息解析成地址
        var geocoder = new AMap.Geocoder({
            city: "010"//城市，默认：“全国”
        });
        var  marker = new AMap.Marker({
            position: address

        });
        marker.setLabel({
            offset: new AMap.Pixel(15, 15),
            content: "sender"
        });
        marker.setMap(map);
        send_markers.push(marker);
        map.setZoom(16);
        map.setCenter(address);
        geocoder.getAddress(address,function(status,result){
            if(status=='complete'){
                tipinput1= result.regeocode.formattedAddress;
                console.log(status,result)
                // message.innerHTML = ''
            }else{
                // message.innerHTML = '无法获取地址'
            }
        });
        if(data.accuracy){
            str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        // document.getElementById('tip').innerHTML = str.join('<br>');
    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('tipinput1').innerHTML = '定位失败';
    }

//为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on('click', function(e) {

        change=document.getElementById("change").value;
        if(change==="0") {
            map.remove(send_markers);
            var  marker = new AMap.Marker({
                position: [e.lnglat.getLng(), e.lnglat.getLat()]

            });
            marker.setLabel({
                offset: new AMap.Pixel(15, 15),
                content: "sender"
            });
            marker.setMap(map);
            send_markers.push(marker);
            map.setZoom(16);
            map.setCenter([e.lnglat.getLng(), e.lnglat.getLat()]);


            AMap.plugin('AMap.Geocoder', function () {
                lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]; //已知点坐标
                //逆地理编码
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                geocoder.getAddress(lnglatXY, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        geocoder_CallBack(result);
                    }
                });

            });
        }
        else if(change==="1"){
            map.remove(reci_markers);
            var marker = new AMap.Marker({
                position: [e.lnglat.getLng(), e.lnglat.getLat()]

            });
            marker.setLabel({
                offset: new AMap.Pixel(15, 15),
                content: "recipent"
            });
            marker.setMap(map);
            reci_markers.push(marker);
            map.setZoom(16);
            map.setCenter([e.lnglat.getLng(), e.lnglat.getLat()]);

            AMap.plugin('AMap.Geocoder', function () {
                lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]; //已知点坐标
                //逆地理编码
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                geocoder.getAddress(lnglatXY, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        geocoder_CallBack(result);
                    }
                });

            });
        }

    });


    $("#ipubtm").click(function () {
    window.location.href="./user_send.html?sender_address="+document.address.tipinput1.value+"&recipent_address="+document.address.tipinput2.value;
});

     map.plugin('AMap.Geolocation', function () {
         geolocation = new AMap.Geolocation({
             enableHighAccuracy: true,//是否使用高精度定位，默认:true
             timeout: 10000,          //超过10秒后停止定位，默认：无穷大
             buttonOffset: new AMap.Pixel(0, 0),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)

             buttonPosition: 'RB',
             convert: true
         });
         map.addControl(geolocation);
         geolocation.getCurrentPosition();
         AMap.event.addListener(geolocation, 'complete', onComplete);

         function onComplete(data) {


             AMap.plugin('AMap.Geocoder', function () {
                 lnglatXY = [data.position.getLng(), data.position.getLat()];
                 //已知点坐标
                 //逆地理编码
                 var geocoder = new AMap.Geocoder({
                     radius: 1000,
                     extensions: "all"
                 });
                 geocoder.getAddress(lnglatXY, function (status, result) {
                     if (status === 'complete' && result.info === 'OK') {
                         geocoder_CallBack(result);
                         map.remove(send_markers);
                         map.setZoom(15);
                         map.setCenter(lnglatXY);
                         marker = new AMap.Marker({
                             position: lnglatXY

                         });
                         marker.setMap(map);
                         marker.setLabel({
                             offset: new AMap.Pixel(15, 15),
                             content: "sender"
                         });
                         send_markers.push(marker);
                     }
                 });

             });
         }

     });


    $("#tipinput1").click(function () {
        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {

                var autoOptions1 = {
                    city: "", //城市，默认全国
                    input: "tipinput1"//使用联想输入的input的id
                };
                autocomplete = new AMap.Autocomplete(autoOptions1);
                var placeSearch = new AMap.PlaceSearch({
                    city: "",
                    map: map
                });

                AMap.event.addListener(autocomplete, "select", function (e) {
                    //TODO 针对选中的poi实现自己的功能
                    map.remove(send_markers);
                    map.setZoom(15);
                    map.setCenter(e.poi.location);
                    var marker = new AMap.Marker({
                        position: e.poi.position

                    });
                    marker.setMap(map);
                    marker.setLabel({
                        offset: new AMap.Pixel(15, 15),
                        content: "sender"
                    });
                    send_markers.push(marker);
                });
            })
    });
     $("#tipinput2").click(function () {
         AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {

             var autoOptions2 = {
                 city: "", //城市，默认全国
                 input: "tipinput2"//使用联想输入的input的id
             };
             autocomplete = new AMap.Autocomplete(autoOptions2);
             var placeSearch = new AMap.PlaceSearch({
                 city: "",
                 map: map
             });
             AMap.event.addListener(autocomplete, "select", function (e) {
                 //TODO 针对选中的poi实现自己的功能
                 map.remove(reci_markers);
                 map.setZoom(15);
                 map.setCenter(e.poi.location);
                 var marker = new AMap.Marker({
                     position: e.poi.position

                 });
                 marker.setMap(map);
                 marker.setLabel({
                     offset: new AMap.Pixel(15, 15),
                     content: "recipent"
                 });
                 reci_markers.push(marker);
             });
         })


     });

     // document.getElementById("tipinput1").blur(function () {
     //     tipinput1= document.getElementById("tipinput1").value;
     //     vs = "0";
     //     AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
     //
     //         placesearch = new AMap.PlaceSearch({
     //             city: '全国',
     //             map: map
     //
     //         });
     //
     //         var auto = new AMap.Autocomplete({
     //             input: "tipinput1"
     //         });
     //         auto.search(document.getElementById("tipinput1").value, function (status, result) {
     //             if (status === "complete") {
     //                 document.getElementById("tipinput1").value= result.tips[0].name;
     //             }
     //             else {
     //
     //                 var key =tipinput1 ;
     //                 var str = new Array();
     //                 for (var i = 1; i < tipinput1.length; i++) {
     //                     str[i] = key.substring(0, key.length - i);
     //                     a(str[i]);
     //                 }
     //             }
     //
     //         });
     //
     //
     //         function a(b) {
     //             auto.search(b, function (status, result) {
     //                 if (status === "complete"&&result.tips.length) {
     //                     if (vs < b.length) {
     //                         vs = b.length;
     //                         send=result.tips[0].name;
     //                         AMap.plugin('AMap.Geocoder',function(){
     //                             var geocoder = new AMap.Geocoder({
     //                                 city: ""//城市，默认：“全国”
     //                             });
     //                             geocoder.getLocation( send,function(status,result){
     //
     //                                 if((status==="complete")&&result.geocodes.length)
     //                                 {
     //                                     map.remove(send_markers);
     //                                     map.setZoom(15);
     //                                     map.setCenter(result.geocodes[0].location);
     //                                     var marker = new AMap.Marker({
     //                                         position:result.geocodes[0].location
     //
     //                                     });
     //                                     marker.setMap(map);
     //                                     marker.setLabel({
     //                                         offset: new AMap.Pixel(15, 15),
     //                                         content: "sender"
     //                                     });
     //                                     send_markers.push(marker);
     //                                 }
     //                             });
     //                         });
     //                         document.getElementById("tipinput1").value = result.tips[0].name;
     //                     }
     //                 }
     //
     //
     //             });
     //         }
     //     })
     //
     // });
    document.getElementById("tipinput1").onkeydown = (function (e) {

        if (e.keyCode === 13) {
            tipinput1= document.getElementById("tipinput1").value;
            vs = "0";
            AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {

                placesearch = new AMap.PlaceSearch({
                    city: '全国',
                    map: map

                });

                var auto = new AMap.Autocomplete({
                    input: "tipinput1"
                });
                auto.search(document.getElementById("tipinput1").value, function (status, result) {
                    if (status === "complete") {
                        document.getElementById("tipinput1").value= result.tips[0].name;
                    }
                    else {

                        var key =tipinput1 ;
                        var str = new Array();
                        for (var i = 1; i < tipinput1.length; i++) {
                            str[i] = key.substring(0, key.length - i);
                            a(str[i]);
                        }
                    }

                });


                function a(b) {
                    auto.search(b, function (status, result) {
                        if (status === "complete"&&result.tips.length) {
                            if (vs < b.length) {
                                vs = b.length;
                                send=result.tips[0].name;
                                AMap.plugin('AMap.Geocoder',function(){
                                    var geocoder = new AMap.Geocoder({
                                        city: ""//城市，默认：“全国”
                                    });
                                    geocoder.getLocation( send,function(status,result){

                                        if((status==="complete")&&result.geocodes.length)
                                        {
                                            map.remove(send_markers);
                                            map.setZoom(15);
                                            map.setCenter(result.geocodes[0].location);
                                            var marker = new AMap.Marker({
                                                position:result.geocodes[0].location

                                            });
                                            marker.setMap(map);
                                            marker.setLabel({
                                                offset: new AMap.Pixel(15, 15),
                                                content: "sender"
                                            });
                                            send_markers.push(marker);
                                        }
                                    });
                                });
                                document.getElementById("tipinput1").value = result.tips[0].name;
                            }
                        }


                    });
                }
            })
        }
    });

    document.getElementById("tipinput2").onkeydown = (function (e) {

        if (e.keyCode === 13) {
            tipinput2= document.getElementById("tipinput2").value;
            vs = "0";
            AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {

                placesearch = new AMap.PlaceSearch({
                    city: '全国',
                    map: map

                });

                var auto = new AMap.Autocomplete({
                    input: "tipinput2"
                });
                auto.search(document.getElementById("tipinput2").value, function (status, result) {
                    if (status === "complete") {
                        document.getElementById("tipinput2").value= result.tips[0].name;
                    }
                    else {

                        var key =tipinput2 ;
                        var str = new Array();
                        for (var i = 1; i < tipinput2.length; i++) {
                            str[i] = key.substring(0, key.length - i);
                            b(str[i]);
                        }
                    }

                });


                function b(b) {
                    auto.search(b, function (status, result) {
                        if (status === "complete"&&result.tips.length) {
                            if (vs < b.length) {
                                vs = b.length;
                                reci=result.tips[0].name;
                                AMap.plugin('AMap.Geocoder',function(){
                                    var geocoder = new AMap.Geocoder({
                                        city: ""//城市，默认：“全国”
                                    });
                                    geocoder.getLocation( reci,function(status,result){

                                        if((status==="complete")&&result.geocodes.length)
                                        {
                                            map.remove(reci_markers);
                                            map.setZoom(15);
                                            map.setCenter(result.geocodes[0].location);
                                            var marker = new AMap.Marker({
                                                position:result.geocodes[0].location

                                            });
                                            marker.setMap(map);
                                            marker.setLabel({
                                                offset: new AMap.Pixel(15, 15),
                                                content: "recipent"
                                            });
                                            reci_markers.push(marker);
                                        }
                                    });
                                });
                                document.getElementById("tipinput2").value = result.tips[0].name;
                            }
                        }


                    });
                }
            })
        }
    });
});
