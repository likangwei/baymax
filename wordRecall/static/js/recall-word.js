$(document).ready(function () {
    $(".recall_word").click(function(){
        text = $(this).attr("value");
        reqUrl = "/set_word_status/" + text + "/0";
        $.get(reqUrl, {

        }, function(data, textStatus){
            toggleClz = data['toggleClz'];
            found = ".recall_word[value=" + text + "]";
            $(found).attr("class","recall_word");
            $(found).toggleClass(toggleClz);
        }, "json");
    });

    $('.recall_word').mouseover(function(){
        var offset = $( this ).offset();
		var pop = $(this);
		box = $('.box');
        word_spelling = pop.attr('value');
        translate = pop.attr('translate');
        var jo = $.parseJSON(translate);
        var translate_html = '';
        try
        {
          var parts = jo.retData.dict_result.symbols[0].parts;
          for (var i = 0; i < parts.length; i ++) {
              cur_p = parts[i];
              translate_html = translate_html + '<span class="translate_part">' + cur_p.part + "</span><br/>";
              cur_means = cur_p.means;
              for(var y = 0; y < cur_means.length; y++){
                  translate_html = translate_html +  '<span class="translate_mean">' + (y+1) + "." + cur_means[y] + "</span><br/>";
              }
          }
        }
        catch(err)
        {
          translate_html = '未找到对应的翻译';
        }

        box.find(".tran").html(translate_html);
        tran_link = "http://translate.google.cn/#en/zh-CN/" + word_spelling;
        box.find(".tran_link").attr({'href': tran_link});
		box.css({'display': 'block', 'top': offset.top + 30, 'left': offset.left });
	});

    $('.box').mouseleave(function(){
		box = $('.box');
		box.fadeOut("fast");
	})

});