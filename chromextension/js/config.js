
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


function getMeaning(spelling, func){
    var msg = 'getMeaning###' + spelling;
    chrome.runtime.sendMessage(msg, func);
}

function refreshWordMeaning(allNewWord) {
    var str = '';
    var iter = allNewWord.values();
    var next = iter.next();

    while(next.value != null){
        str = str + next.value + "#";
        next = iter.next();
    }

    var msg = 'refreshWordMeaning###' + str;
    console.log(msg);
    chrome.runtime.sendMessage(msg, function(response){
        console.log("config.js==>" + response);
    });
}

function getAllWordsFromBak(func){
    var msg = 'getAllWords';
    console.log(msg);
    chrome.runtime.sendMessage(msg, function(response){
        console.log("config.js==>" + response);
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
            var userinfos = response.split("###");
            _host = userinfos[0];
            _user = userinfos[1];
            _pwd = userinfos[2];
            console.log("step to ok");
            func(true);
        }
    });
}

function getClassNameAfterClick(text, func) {
    var msg = "getClzName" + "###" + text;
    chrome.runtime.sendMessage(msg , function(response){
        console.log("config.js==>" + response);
        func(response);
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