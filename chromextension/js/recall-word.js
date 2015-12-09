var translate_map = {};
var user = null;
var pwd = null;
var request_param = null;

var BOX_CLASS = "MYBOX_XODKFJS";

//request_param = {}
function getTranslateDivElementHtml(word_spelling, response){
    //获取某一个单词的解释DIV的HTML
    var translate_html = '<span id="curWord" class="recall_word" value="' + word_spelling + '">' + word_spelling + '</span></br></br>';

    try
    {
        var parts = [response];
        for (var i = 0; i < parts.length; i ++) {
            var cur_p = parts[i];
            translate_html = translate_html + '<span class="translate_part">' + cur_p + "</span><br/>";
        }
    }
    catch(err)
    {
        translate_html = translate_html + "未找到相关翻译";
    }
    return translate_html;
}

function refreshUI(pop, response, word_spelling){
    var offset = pop.offset();
    var box = getBox();

    var translate_html = getTranslateDivElementHtml(word_spelling, response);
    box.find(".tran").html(translate_html);
    $("#curWord").click(recall_word_click);
    var tran_link = "http://translate.google.cn/#en/zh-CN/" + word_spelling;
    box.find(".tran_link").attr({'href': tran_link});

    var vleft = offset.left - document.body.scrollLeft;
    var isLeft = vleft < (document.documentElement.clientWidth / 4);
    var isRight = vleft > (document.documentElement.clientWidth / 4 * 3);

    var vtop = offset.top - document.body.scrollTop;
    var is_top = vtop < (document.documentElement.clientHeight/3);
    var top =  0;

    if(!is_top){
        top = offset.top - box.height() - 10;
    }else{
        top = offset.top + pop.height() + 10;
    }

    var left = 0;
    if(isLeft){
        left = offset.left;
    }else if(isRight){
        left = offset.left - box.width() + pop.width();
    }else{
        left = offset.left - (box.width()/2) + pop.width()/2 ;
    }

    box.css({'display': 'block', 'top': top, 'left': left, 'z-index': 1000 });
}

function onMouseOver(){
    real_hide_tag = false;
    var pop = $(this);
    var word_spelling = pop.attr('value');

    if(word_spelling in translate_map){
        refreshUI(pop, translate_map[word_spelling], word_spelling);
    }else{
        getMeaning(word_spelling, function(response){
            console.log(response);
            refreshUI(pop, response, word_spelling);
            translate_map[word_spelling] = response;
        });
    }



}

function getBox(){
    var box = $('.' + BOX_CLASS);
    return box;
}

var real_hide_tag = true;

function realHide(){
    if(real_hide_tag){
        getBox().fadeOut("fast");
    }
}

function hide_box(){
    real_hide_tag = true;
    //console.log("hide_box==>" + this);
    setTimeout(function(){realHide()},300);
}

function onBoxMouseOver(){

    real_hide_tag = false;
    //console.log("onBoxMouseOver==>" + this);
    real_hide_tag = false;
    getBox().css({'display': 'block'});
}


function recall_word_click(){
    var text = $(this).attr("value");
    function getClassName(isNew){
        var clzName = isNew ? "new_word" : "old_word";
        var found = ".recall_word[value=" + text + "]";
        $(found).attr("class","recall_word");
        $(found).toggleClass(clzName);
    }
    getClassNameAfterClick(text, getClassName);
}

function addWordListener() {
    debugAlert("add listener");

    $('.recall_word').mouseover(onMouseOver);
    $('.recall_word').mouseleave(hide_box);
    $(".recall_word").click(recall_word_click);
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

    debugAlert("change All");
    var body = document.getElementsByTagName("body")[0]
    var all_element = new Array();
    all_element.push(body)

    while(all_element.length > 0){
        var cur_element = all_element.shift();


        for(var i=0; i<cur_element.childNodes.length; i++){
            var cur_child = cur_element.childNodes[i];
            all_element.push(cur_child)
        }
        replaceStr(cur_element);

    }


}

var allNewWord = new Set();

function add2NewWordMap(word){
    allNewWord.add(word);
}



function run(oldWords){
    oldWordMap = oldWords;
    changeAll();
    addBoxDiv();
    addWordListener();
    refreshWordMeaning(allNewWord);
}

function getOldWords() {
    if(oldWordMap != null){
        return oldWordMap;
    }else{
        debugAlert("get old words error");
        return null;
    }
}

function debugAlert(txt){
  if(DEBUG){
    alert(txt);
  }
}

function isNewWord(strText){
    strText = strText.toLowerCase();
    var oldWordList = getOldWords();
    if(!isWord(strText)){
        return false;
    }

    if(strText in oldWordList){
        return oldWordList[strText].status != 1;
    }else{
        return true;
    }
    
}


function replaceStr(oSpan){
    while(oldWordMap == null){
        debugAlert("error oldWordMap == null");
    }
    var exlude_tag_list = {"style": null,
        "code": null, "localName":null, "textarea": null
    }
    if(oSpan.localName in exlude_tag_list){
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
            var isNew = isNewWord(curWord);
            if(isNew){
                add2NewWordMap(curWord.toLowerCase());
                var clzName = isNew ? "recall_word" : "old_word";
                var tmpSpan = document.createElement("span");
                tmpSpan.className = clzName;
                tmpSpan.setAttribute("value", curWord.toLowerCase());
                tmpSpan.innerText = curWord;
            }else{
//                    var clzName = isNew ? "new_word" : "old_word";
                var tmpSpan = document.createTextNode(curWord);
            }
            oSpan.insertBefore(tmpSpan, textElement);

        }
    }

}

function addBoxDiv(){
    var body = document.getElementsByTagName("body")[0]
    debugAlert(body);
    var box = document.createElement("div");
    box.setAttribute('z-index',1000)
    box.className = BOX_CLASS;
    var p = document.createElement("p");
    p.className = "tran";
    box.appendChild(p);
    var a = document.createElement("a");
    a.className = "tran_link";
    a.innerText = "Google翻译一下";
    a.setAttribute("target", "_blank");
    box.appendChild(a);
    body.appendChild(box);

}


$(document).ready(function(){

    function doAfterGetWords(response){
        if(response != null){
            console.log("get words success");
            run(response);
        }
    }
    getAllWordsFromBak(doAfterGetWords);
});
