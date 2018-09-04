
function check() {
    var Phone_number = form_signUp.Phone_number.value;
    var phoneReg = /^1[34578]\d{9}$/;
    //电话
    var phone = $.trim(Phone_number);
    var Name=$('#Name').val();
    var nameReg=/^[\u4e00-\u9fa5A-Za-z]{2,20}$/;
    if(!nameReg.test(Name)){
        return false
    }
    if(!phoneReg.test(phone)) {
        return false;
    }
    return true;
}
$(document).ready(function () {


    $("#SiUpBtm").click(function (){

        event.preventDefault();
        var Username = document.form_signUp.Username.value;
        var Password = document.form_signUp.Password.value;

        var RePassword = document.form_signUp.RePassword.value;
        var Name = document.form_signUp.Name.value;
        var Phone_number = document.form_signUp.Phone_number.value;



        if ((Username !== "")&&(RePassword !== "")&&(Password !== "")&&(Name!=="")&&(Phone_number !== "")) {
            if (Password === RePassword) {
                if(check()) {
                    $.ajax({
                        url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/account",
                        method: "get",
                        success: function (e) {

                            for (var i = 0; i < e.length; i++) {
                                if (e[i].username === Username) {
                                    alert("duplicate username!");
                                    window.location.reload();
                                }
                                else if (e[i].phone_number === Phone_number) {
                                    alert("duplicate Phone number!");
                                    window.location.reload();
                                }
                            }
                            $.ajax({
                                url: "http://47.106.213.40:8080/Logistics-1.0-SNAPSHOT/account/save",
                                method: "POST",
                                data:
                                    $("#form_signUp").serialize()
                                ,
                                success: function (response) {
                                    if(response)
                                    {
                                        alert("success!!");
                                        window.location.reload();
                                    }
                                }
                            })
                        }
                    })
                }
                else{alert("invalid phone number !!");window.location.reload();}

            }
            else {
                alert("not the same!!");
            }
        }

    })

});
