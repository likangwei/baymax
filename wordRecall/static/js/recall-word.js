$(document).ready(function () {
    $(".recall_word").click(function(){
        text = $(this).attr("value");
        reqUrl = "/set_word_status/" + text + "/0"
        $.get(reqUrl, {

        }, function(data, textStatus){
            toggleClz = data['toggleClz'];
            found = ".recall_word[value=" + text + "]"
            $(found).attr("class","recall_word")
            $(found).toggleClass(toggleClz);
        }, "json");
    });

});