var translate_map = {};
var user = null;
var pwd = null;
var request_param = null;
var template_dict = null;
var real_hide_tag = true;

var relation_lines = {}

//request_param = {}
function getTranslateDivElementHtml(word_spelling, response){
    //获取某一个单词的解释DIV的HTML
    var template = Handlebars.compile(template_dict["inside"]);
    response["spelling"] = word_spelling;
    let lines = relation_lines[word_spelling]
    
    let content = [window.location.href]
    let count = 0
    lines.forEach(function(line){
      count = count + 1
      content.push("\n" + count + ". " + line)
    })
    content = content.join("\n")
    console.log(content)
    content = encodeURIComponent(content)
    let url = "http://memoryplus.likangwei.com/knowledges?title=" + word_spelling + "&content=" + content
    let link = [
      "<a href='", url, "'>", "添加到Mem++", "</a>"
    ].join("")
    console.log(link)
    response["custom"] = link
    var html = template(response);
    console.log(html)
    return html;
}

function refreshUI(wordDom, response, word_spelling){
    var offset = wordDom.offset();

    var box = getBox();
    var vleft = offset.left - document.body.scrollLeft;
    var isLeft = vleft < (document.documentElement.clientWidth / 4);
    var isRight = vleft > (document.documentElement.clientWidth / 4 * 3);

    var vtop = offset.top - document.body.scrollTop;
    var is_top = vtop < (document.documentElement.clientHeight/4);
    var top =  0;
    if(is_top){
        top = offset.top + wordDom.height() ;
    }else{
        top = offset.top - box.height() - wordDom.height() - 20;
    }
    var left = 0;
    if(isLeft){
        left = offset.left;
    }else if(isRight){
        left = offset.left - box.width() + wordDom.width();
    }else{
        left = offset.left - (box.width()/2) + wordDom.width()/2 ;
    }
    var innerHTML = getTranslateDivElementHtml(word_spelling, response);
    box.html(innerHTML);
    box.css({'top': top, 'left': left, "display": "block"});
}

function getMeaning(spelling, func){
    console.log(relation_lines[spelling])
    var msg = {
      "action": ACTIONS.GET_ONE_MEANING,
      "body": {"spelling": spelling}
    };
    chrome.runtime.sendMessage(msg, func);
}

function onMouseOver(){
    real_hide_tag = false;
    var wordDom = $(this);
    var word_spelling = wordDom.attr('value');
    getMeaning(word_spelling, function(response){
        if(response.success){
            console.debug(JSON.stringify(response.body));
            refreshUI(wordDom, response.body, word_spelling);
        }
    });
}

function getBox(){
    var box = $("#READDOC_BOX_DIV");
    return box;
}


function realHide(){
    if(real_hide_tag){
        getBox().fadeOut("fast");
    }
}

function hide_box(){
    real_hide_tag = true;
    setTimeout(function(){realHide()}, 500);
}

function onBoxMouseOver(){
    real_hide_tag = false
    getBox().css({'display': "block"});
}
var timestamp_count_map = {};

function refreshWordClz(response){
    var spelling = response.spelling;
    var clzName = response.is_new ? "new_word" : "old_word";
    var found = ".recall_word[value=" + spelling + "]";
    $(found).attr("class","recall_word");
    $(found).toggleClass(clzName);
}

function recall_word_click(){
    var text = $(this).attr("value");
    var timestamp = new Date().getTime();
    var msg = {action: ACTIONS.CHANGE_MYWORD_STATUS, body: {"spelling": text}, "timestamp": timestamp};
    chrome.runtime.sendMessage(msg , function(response){
        console.log("返回" + JSON.stringify(response));
        waitResult(timestamp, refreshWordClz);
    });
}

function addWordListener() {
    $(".recall_word").click(recall_word_click);
    $('.recall_word').mouseover(onMouseOver);
    $('.recall_word').mouseleave(hide_box);
    getBox().mouseover(onBoxMouseOver);
    getBox().mouseleave(hide_box);

}


var oldWordMap = null;

function isWord(strText){
    if (strText.match(/[a-zA-Z]{3,}/)) {
        return true;
    }
    else {
        return false;
    }
}

function changeAll() {
    var body = document.getElementsByTagName("body")[0]
    var all_element = new Array();
    all_element.push(body);

    while(all_element.length > 0){
        var cur_element = all_element.shift();

        for(var i=0; i<cur_element.childNodes.length; i++){
            var cur_child = cur_element.childNodes[i];
            all_element.push(cur_child)
        }
        build_tao_dom(cur_element);
    }
}

var allNewWordSet = new Set();

function add2NewWordMap(word){
    allNewWordSet.add(word);
}

function refreshWordMeaning(allNewWordSet) {
    var iter = allNewWordSet.values();
    var next = iter.next();
    var newWords = [];
    while(next.value != null){
        newWords.push(next.value);
        next = iter.next();
    }
    var msg = {"action": ACTIONS.GET_MEANINGS, "body": newWords};
    chrome.runtime.sendMessage(msg, function(response){
    });
}


function run(oldWords){
    oldWordMap = oldWords;
    changeAll();
    addBoxDiv();
    addWordListener();
    refreshWordMeaning(allNewWordSet);
}

function getOldWords() {
    if(oldWordMap != null){
        return oldWordMap;
    }else{
        return null;
    }
}


function isNewWord(strText){
    strText = strText.toLowerCase();
    var oldWordList = getOldWords();
    if(!isWord(strText)){
        return false;
    }

    return !(strText in oldWordList);
}


function build_tao_dom(oSpan){
    // 把当前dom进行加工
    while(oldWordMap == null){
        debugAlert("error oldWordMap == null");
    }
    var exclude_tag_list = {
        "style": null,
        "code": null, 
        "localName":null, 
        "textarea": null,
        "script": null,
    }
    if(oSpan.localName in exclude_tag_list){
        return;
    }

    var childNodes = oSpan.childNodes;
    var need2appendList = new Array();
    for(var i=0; i<childNodes.length; i++){
        var curNode = childNodes[i];
        if(curNode.nodeType == 3){
            var textElement = oSpan.childNodes[i];
            need2appendList.push(textElement);
        }
    }
    for(var i=0; i<need2appendList.length; i++){
        var textElement = need2appendList[i];
        var text = textElement.nodeValue;
        textElement.nodeValue = "";
        var words = text.split(/([a-zA-Z]+)/g);
        
        for(var y=0; y<words.length; y++){
            var curWord = words[y];

            if (relation_lines[curWord] == null){
                relation_lines[curWord] = new Set()
            }
            relation_lines[curWord].add(text)
        
            var isNew = isNewWord(curWord);
            if(isNew){
                add2NewWordMap(curWord.toLowerCase());
                var clzName = isNew ? "recall_word" : "old_word";
                var tmpSpan = document.createElement("span");
                tmpSpan.className = clzName;
                tmpSpan.setAttribute("value", curWord.toLowerCase());
                tmpSpan.innerText = curWord;
            }else{
                var tmpSpan = document.createTextNode(curWord);
            }
            oSpan.insertBefore(tmpSpan, textElement);
        }
    }

}


function addBoxDiv(){
    var box_html = template_dict['outside'];
    $("body").append($(box_html));

}


function getAllWordsFromBak(func){
    chrome.runtime.sendMessage({"action": ACTIONS.GET_ALL_WORDS}, function(response){
        func(response);
    });
}
function getTemplateDictFromBak(func){
    chrome.runtime.sendMessage({"action": ACTIONS.GET_TEMPLATE}, function(response){
        func(response);
    });
}

$(document).ready(function(){
    function doAfterGetWords(response){
        if(response.success){
            console.debug("获取词库成功");
            run(response.body);
        }else{
            console.debug(response.msg);
        }
    };

    getTemplateDictFromBak(function (response) {
        if (response.success){
            console.debug("获取模板成功");
            template_dict = response.body.template_dict;
            getAllWordsFromBak(doAfterGetWords);
        }else{
            console.error("获取模板失败" + response.msg);
        }
    });
});
