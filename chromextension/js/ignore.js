/**
 * Created by likangwei on 15/12/25.
 */
    var KEY_IGNORE_URL = "KEY_IGNORE_URL";
    var csrftoken = ''

    function get_url_domain(url){
        if(url != null){
            return url.split("/")[0] + "//" + url.split("/")[2];
        }
    }

    function set_ignore_urls(data){
        store.set(KEY_IGNORE_URL, data);
    }

    function get_ignore_urls(){
        data = store.get(KEY_IGNORE_URL);
        if (data == null){
            sync_ignore_urls();
            return [];
        }
        return data;
    }

    function get_ignore_url_obj(url){
        var domain = get_url_domain(url);
        var igurls = get_ignore_urls();
        for(var i=0; i<igurls.length; i++){
            if(igurls[i].url == domain){
                return igurls[i];
            }
        }
    }

    function is_ignore_url(url){
        // 总是自动翻译
        var urlinfo = get_ignore_url_obj(url);
        if (userinfo.settings.auto_change_page){
            if(urlinfo != null){
                return urlinfo.type == IGNORE_TYPE.DONT_TRAN;
            }else{
                return false;
            }
        }else{
            if(urlinfo != null){
                return urlinfo.type == IGNORE_TYPE.DONT_TRAN;
            }else{
                return true;
            }
        }

    }


function ignore_url(url){
    // 不再翻译此页
    url = get_url_domain(url);
    var urlinfo = get_ignore_url_obj(url);
    if(urlinfo == null){
        $.ajax({
            method: "POST",
            url: host + "/rest/settings/",
            data: {'url': url, type: IGNORE_TYPE.DONT_TRAN},
        }).done(function(data) {
            notify("不再翻译 " + url );
            sync_ignore_urls();
        }).fail(function(){
            notify("失败");
        });
    }else{
        if(urlinfo.type == IGNORE_TYPE.DONT_TRAN){
            notify("不再翻译 " + url );
            sync_ignore_urls();
        }else{
           $.ajax({
                method: "PATCH",
                url: host + "/rest/settings/" + urlinfo.id + "/",
                data: {type: IGNORE_TYPE.DONT_TRAN}
            }).done(function() {
                notify("不再翻译 " + url );
                sync_ignore_urls();
            }).fail(function(){
               notify("失败");
           });
        }
    }

}


function auto_tran_url(url){
    // 翻译此页
    url = get_url_domain(url);
    var urlinfo = get_ignore_url_obj(url);
    if (urlinfo == null){
         $.ajax({
            method: "POST",
            url: host + "/rest/settings/",
            data: {type: IGNORE_TYPE.AUTO_TRAN, url: url}
            }).done(function() {
              notify("总是翻译 " + url );
              sync_ignore_urls();
            }).fail(function(){
               notify("失败");
            });
    }else{
        if(urlinfo.type == IGNORE_TYPE.AUTO_TRAN){
            notify("总是翻译 " + url );
            sync_ignore_urls();
        }else{
            $.ajax({
                method: "PATCH",
                url: host + "/rest/settings/" + urlinfo.id + "/",
                data: {type: IGNORE_TYPE.AUTO_TRAN}
                })
            .done(function() {
                notify("总是翻译 " + url );
                sync_ignore_urls();
            }).fail(function(){
               notify("失败");
            });
        }

    }
}


function sync_ignore_urls(){
    console.log("同步ignore urls");
     $.ajax({
            method: "GET",
            url: host + "/rest/settings/",
     })
    .done(function( data ) {
        set_ignore_urls(data);
    }).fail(function(){
       notify("同步urls失败");
    });;
}