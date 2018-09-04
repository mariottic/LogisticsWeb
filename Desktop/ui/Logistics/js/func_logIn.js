$(document).ready(function () {

    $("#Logbtm").click(function () {

        var Username = $('#Username').val();
        var Password =  hex_md5("blacklove");

        if((Username!=="")&&(Password!=="")) {
            event.preventDefault();
            $.ajax({
                url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/account/" + Username,
                method: "get",
                success: function (e) {
                    if (Password === e.password) {
                        sessionStorage.setItem("username",Username);
                        if(e.permission==="User") {
                            window.location.href = "../html/user.html" ;
                        }
                        else if(e.permission==="Admin"){
                            window.location.href = "../html/admin.html" ;
                        }
                        else if(e.permission==="Driver"){
                            window.location.href = "../html/driver.html" ;
                        }
                    }
                    else
                    {
                        alert("wrong username or wrong password !");
                        window.location.reload();
                    }


                }
            })



        })
});