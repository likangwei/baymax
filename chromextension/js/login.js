
function getPopWindow(){
    var timestamp = new Date().getTime();
    var msg = {"action": ACTIONS.GET_POP_WINDOW, "timestamp": timestamp, "body": null};
    console.log("让后台刷新pop window");
    chrome.runtime.sendMessage(msg, function(){
        waitResult(timestamp, function(response){
            console.log("获取pop成功" + JSON.stringify(response));
            if(response.success){
                var content = response.body;
                document.getElementsByTagName('body')[0].innerHTML = content;
                $("#restart_div").click(function(){
                    restart_extension();
                });
            }
        });
    });
}
getPopWindow();

function restart_extension(){
    var msg = {action: ACTIONS.RESTART, body: null};
    chrome.runtime.sendMessage(msg, function(response){
        console.log(JSON.stringify(response));
    });
}
