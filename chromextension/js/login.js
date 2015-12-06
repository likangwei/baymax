function checkUser(user_name, pwd, func){
    var curUrl = getHost() + "/checkUser";
    console.log("request==>" + curUrl)
    var param = {"user": user_name, "pwd": pwd}
    $.get(curUrl,
            param,
            function(result) {
                var jo = $.parseJSON(result);
                var status = jo.result;

                if(status == "ok"){
                    func(true);

                }else{
                    func(false);
                }

            }
    ).fail(function(){
            console.log("登陆失败，请查看网络");
    });
}



function init(){
    var host = getHost();
    $(".host")[0].innerText = host;
    var userName = getUserName();
    var pwd = getUserPwd();
    refreshUI(false);
    if(userName != null && pwd != null){
        $(".username")[0].value = userName;
        $(".pwd")[0].value = pwd;

        function do_login(status){
            refreshUI(status);
        }
        checkUser(userName, pwd, do_login);
    }
}


function logout(){
    function clearData(status){
        if(status){
                refreshUI(false);
        }
    }

    clear_all_data(clearData);
}

function refreshUI(ifLoginSuccess){

    var login_status = "";
    if(ifLoginSuccess){
        login_status = "已登陆：" + getUserName();
        $(".wiz_login").hide();
        $(".logout").show();
    }else{
        login_status = "未登陆";
        $(".logout").hide();
        $(".wiz_login").show();
    }

    $(".user_info")[0].innerText = login_status;
}


$(".logout").click(logout);



$(".start").click(startBak);
$(".stop").click(stopBak);

$(".btn_login").click(function() {
    // body...
    var userName = $(".username")[0].value;
    var pwd = $(".pwd")[0].value;

    function do_login(status){
    if(status){
        function setUserInfoStatus(status){
            if(status){
                refreshUI(true);
            }else{
                refreshUI(true);
            }
        }

        setUserInfo(getHost(), userName, pwd, setUserInfoStatus);
    }
}
    checkUser(userName, pwd, do_login);
});

function run(getStatusSuccess){
    console.log("get user info " + getStatusSuccess);
    if(getStatusSuccess){
        init();
    }else{
        refreshUI(false);
    }
}

getUserInfoFromBackground(run);
