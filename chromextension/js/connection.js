var _host = null;
var _user = null;
var _pwd = null;
var DEBUG = false;


function setUserInfo(host, userName, pwd, func){
    var msg = "setUserInfo" + "###" + host + "###" +userName + "###" + pwd;
    chrome.runtime.sendMessage(msg, function(response){
        if(response = "ok"){
            _host = host;
            _user = userName;
            _pwd = pwd;
            func(true);
        }else{
            func(false);
        }
    });
}


function clear_all_data(func){
        chrome.runtime.sendMessage('clear', function(response){
        console.log("config.js==>" + response);
        if(response == "fail"){
            func(false);
        }else{
            func(true);
            _user = null;
            _pwd = null;
        }
    });
}


function getAllWordsFromBak(func){
    chrome.runtime.sendMessage(ACTIONS.GET_ALL_WORDS, function(response){
        func(response);
    });
}

function getUserInfoFromBackground(func){
    chrome.runtime.sendMessage('getUserInfo', function(response){
        console.log("config.js==>" + response);
        if(response == "fail"){
            console.log("step to fail");
            func(false);
        }else{
            _host = response.host;
            _user = response.user;
            _pwd = response.pwd;
            console.log("获取用户信息成功");
            func(true);
        }
    });
}


function start(ifStart){
    var msg = "start###" + ifStart;
    chrome.runtime.sendMessage(msg , function(response){
        console.log("config.js==>" + response);
        func(response);
    });
}


function startBak(){
    start(true);
}

function stopBak(){
    start(false)
}
function getHost(){
    return _host;
}

function getUserName(){
    return _user;
}

function getUserPwd(){
    return _pwd;
}

getUserInfoFromBackground(function(ifSuccess){});