var KEY_USER = "username-myx9x091";
var KEY_PWD = "pwd-ucuaksdf";
var KEY_HOST = "HOST";
var KEY_MEANING = "KEY_MEANING";
var last_get_timetamp = 0;
//host = "http://127.0.0.1:8000";
host = "http://readdoc.net";
meanings = {}
store.set(KEY_HOST, host);

function getHost(){
    return store.get(KEY_HOST);
}

function getUserInfo(){
    var host = getHost();
    var user = store.get(KEY_USER);
    var pwd = store.get(KEY_PWD);
    var result = null;

    result =  host + "###" + user + "###" + pwd;

    return result;
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

function clear(){
    store.clear();
    last_get_timetamp = 0;
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


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log("后台收到命令:" + message);
    var response = null;

    if (message == "getUserInfo"){
        response = getUserInfo();
    }

    if (message == "getAllWords"){
        var domain = sender.url.split("/")[2]
        var not_tran_list = store.get("not_tran");
        if(not_tran_list!=null && domain in not_tran_list && not_tran_list[domain]==true ){
            response = null;
        }else if(!isLogin()){
            notify("当前未登陆单词变色");
            response = null;
        }else {
            getAllWords(function(rep){});
            response = oldWordMap();
        }
    }

    if (message == "clear"){
        clear();
        response = "ok";
    }

    if (message.startsWith("start###")){
        var ifStart = message.split("###")[1] == "true"
        store.set("start###", ifStart)
        response = "ok"
    }

    if (message.startsWith("getClzName")){
        var word = message.split("###")[1];

        var change2new = changeWord2New(word);
        response = change2new;
    }

    if (message.startsWith("setUserInfo")){
        var infos = message.split("###");
        var host = infos[1];
        var user = infos[2];
        var pwd = infos[3];
        store.set(KEY_HOST, host);
        store.set(KEY_USER, user);
        store.set(KEY_PWD, pwd);
        getAllWords(function(rep){});
        response = "ok"
    }

    if (message.startsWith("refreshWordMeaning")){
        var words = message.split("###")[1];
        getAllMeaning(words);
        response = "ok"
    }

    if (message.startsWith("getMeaning")){
        var word = message.split("###")[1];
        var key = word;
        response = meanings[key];
    }
    console.log("后台收到命令:" + message + "\n 返回数据:" + response);
    sendResponse(response);
});

function isLogin(){
    var user = store.get(KEY_USER);
    var pwd = store.get(KEY_PWD);
    return user != null && pwd != null ;
}

function getUser(){
    var user = store.get(KEY_USER);
    return user;
}

function getPwd(){
    var pwd = store.get(KEY_PWD);
    return pwd;
}

function getAllWords(func){
    //last_get_timetamp = 0;
    var host = getHost();
    var curUrl = host + "/get_words";
    request_param = {"user": getUser(), "pwd": getPwd(), 
        "last_get_timetamp": last_get_timetamp};
    $.get(curUrl,
            request_param,
            function(result) {
                var jo = $.parseJSON(result);
                if(jo.status != "ok"){
                    func(null);
                }
                last_get_timetamp = jo.timestamp;
                var words = jo.result;

                if(jo.result.length > 0){
                    wordCount = store.length
                    var msg = "更新了 " + jo.result.length + " 个单词" ;
                    notify(msg);
                }
                
                var split_word_list = jo.result;
                for(var i=0; i<split_word_list.length; i++){
                    var curWord = split_word_list[i].spelling;
                    store.set(curWord, split_word_list[i]);
                }
                console.log("refresh words....");
                if (func){func("")};
            }
    ).fail(function(){
        if (func){func(oldWordMap)};
    });
}


function getAllMeaning(words){
    var ws = words.split("#");
    words = [];
    for(var i=0; i<ws.length; i++){
        var key = ws[i];
        if(!(key in meanings)){
            words.push(key);
        }

    }
    var host = getHost();
    var reqUrl = host + "/get_words_meaning";
    console.log('request url ==>' + reqUrl)
     $.post(reqUrl, {"user": getUser(), "pwd": getPwd(), "words": words},
            function(response){
            console.log('response ==>' + response.toString())
            if(response.status == "ok"){
                meanings = response.result
            }
            console.log("此页加载完成。");
    }, 'json');
}

function changeWord2New(spelling) {

    var change2new = false;
    if(store.get(spelling) != null){
        var curWord = store.get(spelling)
        change2new = curWord.status == 1;

    }else{
        change2new = false;
    }

    var user = store.get(KEY_USER);
    var pwd = store.get(KEY_PWD);
    var host = getHost();
    var status = change2new ? "new" : "old";
    var reqUrl = host + "/set_word_status/" + spelling + "/" + status;
     $.get(reqUrl, {"user": user, "pwd": pwd },
            function(result){
            getAllWords();
    });
    return change2new;
    
}

if(getUser() != null && getPwd() != null){
   getAllWords();

}

function if_tran_this_page(infos, tab, iftran){
// 是否翻译此网页
    var pageUrl = infos.pageUrl;
    var notUrl = pageUrl.split("/")[2]
    var not_tran_list = store.get("not_tran");
    if (not_tran_list == null){
        not_tran_list = {};
    }
    
    not_tran_list[notUrl] = !iftran;
    

    
    store.set("not_tran", not_tran_list);
}

function tran_this_page(infos, tab){
    if_tran_this_page(infos, tab, true);

}

function dont_tran_this_page(infos, tab){
    if_tran_this_page(infos, tab, false); 
}

chrome.contextMenus.create(
    {
        type: "normal",
        title: "单词变色",
        id: 'main2',
        contexts: ['all']
    }
)

chrome.contextMenus.create(
    {
        type: "normal",
        title: "不翻译此页",
        id: 'nottran',
        parentId: 'main2',
        onclick: dont_tran_this_page
    }
)

chrome.contextMenus.create(
    {
        type: "normal",
        title: "翻译此页",
        id: 'tran',
        parentId: 'main2',
        onclick: tran_this_page
    }
)