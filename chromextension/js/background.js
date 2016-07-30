var template_dict = null;
var userinfo = null;
var pop_window_response_map = {};
var meanings = {};
var if_has_login = false;
store.clear();
var action_status_map = {};

function clear(){
    store.clear();
    template_dict = null;
    userinfo = null;
    pop_window_response_map = {};
    meanings = {};
    if_has_login = false;
    store.clear();
    action_status_map = {};

}


function actionFinish(timestamp, rst){
    action_status_map[timestamp] = {"status": ACTION_STATUS.FINISH, "result": rst}
}

function regActionIfNotExist(timestamp){
    if (!(timestamp in pop_window_response_map)){
        action_status_map[timestamp] =  {"status": ACTION_STATUS.RUNNING};
    }
}


function oldWordMap(){
    return store.getAll();
}

var warningId = 'notification.warning';


function hideWarning(done) {
  chrome.notifications.clear(warningId, function() {
    if (done) done();
  });
}




function notify(message) {
  hideWarning(function() {
    chrome.notifications.clear(warningId, function() {});
    var ntf = chrome.notifications.create(warningId, {
      iconUrl: chrome.runtime.getURL('images/icon-48.png'),
      title: '提示',
      type: 'basic',
      message: message,
      //buttons: [{ title: 'Learn More' }],
      isClickable: true,
      priority: 2,
    }, function() {});

    setTimeout(function () {
          chrome.notifications.clear(warningId, function() {})}
        ,3000);
  });
}


function get_pop_window(sendResponse, timestamp){
    // 返回pop登陆界面
    regActionIfNotExist(timestamp);
    console.log("开始获取pop window");
    var url = host + "/pop_login";
    var rsp = {"success": true, "body": "正在获取中..."};
    sendResponse(rsp);
    $.getJSON(url, {version: VERSION}, function(response){
        console.log("返回" + JSON.stringify(response));
        actionFinish(timestamp, response);
    }).fail(function(){
        var rsp = {"success": false, "body": "网络错误", "retry": true};
        actionFinish(timestamp, rsp);
    });
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("后台收到命令:" + JSON.stringify(message));
    var response = null;
    var action = null;
    var body = null;

    try {
        action = message["action"];
        body = message["body"];
        if (action == null) {
            response = {"success": false, "msg": "无效的请求"}
        }
    } catch (e) {
        console.log("请求格式不对");
        response = {"success": false, "msg": "无效的请求"}
    }
    if(action == ACTIONS.RESTART){
        clear();
        check_has_login();
    }else if(action == ACTIONS.WAIT_RESULT){
        timestamp = message['timestamp'];
        if(timestamp in action_status_map){
            response = {"success": true, "body": action_status_map[timestamp]}
        }else{
            response = {"success": false, "msg": "没有此任务"}
        }

    }else if(action == ACTIONS.GET_MY_WORD){
        response = {"success": true, "body":store.get(body['spelling'])}
    }else if(action == ACTIONS.GET_POP_WINDOW) {
        get_pop_window(sendResponse, message['timestamp']);
        return;
    }else if(action == ACTIONS.GET_TEMPLATE){
        response = {"success": true, "body": {"template_dict": template_dict}}
    }else if (action == ACTIONS.GET_USER_INFO){
        if(!if_has_login){
            response = {"success": false, "msg": "用户未登陆"};;
        }else{
            response = {"success": true, "body": {"userinfo": userinfo}}
        }
    }else if (action == ACTIONS.GET_ALL_WORDS){
        if(!if_has_login){
            check_has_login();
            response = {"success": false, "msg": "用户未登陆"};;
        }else if(is_ignore_url(sender.url)){
            response = {"success": false, "msg": "这个页面已被标记为不翻译"};
        }else {
            response =  {"success": true, "body": oldWordMap()}
        }
    }else if (action == "clear"){
        clear();
        response = "ok";
    }else if (action == ACTIONS.CHANGE_MYWORD_STATUS){
        changeWordStatus(body['spelling'], message["timestamp"]);
    }else if (action == ACTIONS.GET_MEANINGS){
        getAllMeaning(body);
        response = {"success": true, "msg": "后台开始获取词义"}
    }else if (action == ACTIONS.GET_ONE_MEANING){
        var word = body['spelling'];
        if(word in meanings){
            response = {"success": true, "body": meanings[word]}
        }else{
            response = {"success": true, "body": {
                "spelling": word, "google_meaning": "小淘正在努力翻译中...先用google翻译下吧~"}
            }
        }

    }
    console.log("后台返回数据:" + JSON.stringify(response));
    sendResponse(response);
});


function getAllMyWords(){
    console.log("开始获取我的词库");
    var curUrl = host + "/rest/mywords/";

    $.getJSON(curUrl, {}, function(words) {
        console.log("获取当前用户生熟词库成功");
        for(var i=0; i<words.length; i++){
            store.set(words[i].spelling, words[i]);
        }
        if(words.length > 0){
            var msg = "更新词库成功, 共计" + words.length + "条记录" ;
            notify(msg);
        }
        console.log("刷新词库完成");
    });
}


function getAllMeaning(words){
    var need_to_get = [];
    for (var i=0; i < words.length; i++){
        if(!(words[i] in meanings)){
            need_to_get.push(words[i]);
        }
    }
    var reqUrl = host + "/rest/words/";
    if(need_to_get.length != 0){
        $.get(reqUrl, {"filter": JSON.stringify({"spelling__in": need_to_get})},
        function(response){
            for(var i=0; i < response.length; i++){
                wd = response[i];
                meanings[wd['spelling']] = wd;
            }
            console.log("获取词义成功!");
         }, 'json');
    }
}

function change_to_know_word(spelling, timestamp){
    var data = {"spelling": spelling};
    $.ajax({
        method: "POST",
        url: host + "/rest/mywords/",
        data: data
    })
    .done(function(data){
        console.log(JSON.stringify(data));
        store.set(data['spelling'], data);
        notify(spelling + " 被标记为熟词");
        actionFinish(timestamp, {"is_new": false, "spelling": spelling})
    }).fail(function(){
        notify(word.spelling + " 标记熟词失败!");
        actionFinish(timestamp, {"is_new": true, "spelling": spelling})
    });
}

function delete_myword(myword, timestamp){
    $.ajax({
        method: "DELETE",
        url: host + "/rest/mywords/" + myword.id+ "/",
    })
    .done(function(){
        store.remove(myword.spelling);
        notify(myword.spelling + " 被标记为生词");
        actionFinish(timestamp, {"is_new": true, "spelling": myword.spelling});
    }).fail(function(){
        actionFinish(timestamp, {"is_new": false, "spelling": myword.spelling});
        notify(word.spelling + " 标记生词词失败!");
    });
}

function changeWordStatus(spelling, timestamp){
    regActionIfNotExist(timestamp);
    var myword = store.get(spelling);
    if(myword != null){
        // 删除熟词
        delete_myword(myword, timestamp);
    }else{
        // 添加为熟词
        change_to_know_word(spelling, timestamp);
    }
}


function check_has_login(){
    $.getJSON(host + "/rest/users/", {}, function (response) {
    if(response.length == 1){
        userinfo = response[0];
        if_has_login = true;
        if(userinfo.is_valid){

            console.log('用户已登陆' + userinfo.username);
            get_templates();
            sync_ignore_urls();
            getAllMyWords();
        }else{
            notify("用户登陆成功, 但验证未通过, 请打开插件页面查看具体信息")
        }

    }}).fail(function(){
        console.log("get user info fail...")
        notify("用户登陆失败");
    });
}


check_has_login();
function get_templates(){
    $.getJSON(host + "/template", {}, function(response){
        template_dict = response;
        console.log("刷新模板成功");
    })
}


function tran_this_page(infos, tab){
    auto_tran_url(infos.pageUrl);
}


function dont_tran_this_page(infos, tab){
    ignore_url(infos.pageUrl);
}


chrome.contextMenus.create(
    {
        type: "normal",
        title: "淘生词",
        id: 'main2',
        contexts: ['all']
    }
);


chrome.contextMenus.create(
    {
        type: "normal",
        title: "不再翻译此页",
        id: 'nottran',
        parentId: 'main2',
        onclick: dont_tran_this_page,
        contexts: ['all']
    }
);


chrome.contextMenus.create(
    {
        type: "normal",
        title: "总是翻译此页",
        id: 'tran',
        parentId: 'main2',
        onclick: tran_this_page,
        contexts: ['all']
    }
);
