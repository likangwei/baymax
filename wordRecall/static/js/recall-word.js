var host1 = "http://127.0.0.1:8000";
var host2 = "http://www.likangwei.com";
var host = host1;
var translate_map = {}


function getTranslateDivElementHtml(jo){
    //获取某一个单词的解释DIV的HTML
    var translate_html = '';

    try
    {
        var parts = jo.retData.dict_result.symbols[0].parts;
        for (var i = 0; i < parts.length; i ++) {
            var cur_p = parts[i];
            translate_html = translate_html + '<span class="translate_part">' + cur_p.part + "</span><br/>";
            var cur_means = cur_p.means;
            for(var y = 0; y < cur_means.length; y++){
                translate_html = translate_html +  '<span class="translate_mean">' + (y+1) + "." + cur_means[y] + "</span><br/>";
            }
        }
    }
    catch(err)
    {
        translate_html = "未找到相关翻译";
    }
    return translate_html;
}

function refreshUI(pop, translateJson, word_spelling){
    var offset = pop.offset();
    var box = $('.box');
    var translate_html = getTranslateDivElementHtml(translateJson);
    box.find(".tran").html(translate_html);
    var tran_link = "http://translate.google.cn/#en/zh-CN/" + word_spelling;
    box.find(".tran_link").attr({'href': tran_link});
    box.css({'display': 'block', 'top': offset.top + 30, 'left': offset.left });
}

function onMouseOver(){
    var pop = $(this);
    var word_spelling = pop.attr('value');

    var reqUrl = host + "/get_word_detail/" + word_spelling;

    if(word_spelling in translate_map){
        refreshUI(pop, translate_map[word_spelling], word_spelling);
    }else{
        $.get(reqUrl, {

        }, function(translateJson, textStatus){
            refreshUI(pop, translateJson, word_spelling);
            translate_map[word_spelling] = translateJson;
        }, "json");

    }



}

function test(){
    alert(1);
}

function addWordListener() {
    alert("add listener")
    $('.recall_word').mouseover(onMouseOver);

    $(".recall_word").click(function(){
        text = $(this).attr("value");
        var reqUrl = host + "/set_word_status/" + text + "/0";
        $.get(reqUrl, {

        }, function(data, textStatus){
            var toggleClz = data['toggleClz'];
            var found = ".recall_word[value=" + text + "]";
            $(found).attr("class","recall_word");
            $(found).toggleClass(toggleClz);
        }, "json");
    });


    $('.box').mouseleave(function(){
		var box = $('.box');
		box.fadeOut("fast");
	});

}


var oldWordMap = null;

function isWord(strText){
    if (strText.match(/\w+/)) {
        return true;
    }
    else {
        return false;
    }
}

function run(){
    var curUrl = host + "/get_words/";
    $.get(curUrl,
            {},
            function(result, status) {
                var jo = $.parseJSON(result);
                words = jo.result;
                oldWordMap = {};
                var split_word_list = words.split(",");
                for(var i=0; i<split_word_list.length; i++){
                    var curWord = split_word_list[i];
                    oldWordMap[curWord] = 0;
                }

                alert(words);
                var oSpan = document.getElementById("spanText");
                replaceStr(oSpan);
                return oldWordMap;
            }
    ).fail(function(){
            alert("http error");
    });

}

function getOldWords() {
    if(oldWordMap != null){
        return oldWordMap;
    }else{
        alert("get old words error");
        return null;
    }

}


function isNewWord(strText){
    var oldWordList = getOldWords();
    if(!isWord(strText)){
        return false;
    }
    if(strText in oldWordList){
        return false;
    }
    return true;
}


function replaceStr(oSpan){
    while(oldWordMap == null){
        alert("error oldWordMap == null");
    }
    var childNodes = oSpan.childNodes;
    var need2appendList = new Array();
    for(var i=0; i<childNodes.length; i++){
        if(childNodes[i].nodeType == 3){
            var textElement = oSpan.childNodes[i];
            need2appendList.push(textElement);
        }
    }
    for(var i=0; i<need2appendList.length; i++){
        var textElement = need2appendList[i];
        var text = textElement.nodeValue;
        textElement.nodeValue = "";
        var words = text.split(/(\w+)/g);

        for(var y=0; y<words.length; y++){

            var curWord = words[y];
            var isNew = isNewWord(curWord);
            if(isNew){
                var clzName = isNew ? "recall_word" : "old_word";
                var tmpSpan = document.createElement("span");
                tmpSpan.className = clzName;
                tmpSpan.setAttribute("value", curWord.toLowerCase());
                tmpSpan.innerText = curWord;
            }else{
//                    var clzName = isNew ? "new_word" : "old_word";
                var tmpSpan = document.createElement("text");
//                    tmpSpan.className = clzName;
                tmpSpan.innerText = curWord;

            }
            oSpan.insertBefore(tmpSpan, textElement);

        }
    }
    addWordListener();
}

function addBoxDiv(){
    var body = document.getElementsByTagName("body")
    alert(body);
}

$(document).ready(function(){
    addBoxDiv();
    run();
});