/**
 * Created by likangwei on 15/12/25.
 */
    var host = getHost();
    var KEY_IGNORE_URL = "KEY_IGNORE_URL";
    var csrftoken = ''

    function auth_header( xhr ) {
        xhr.setRequestHeader ("Cookie", "abc");
        xhr.setRequestHeader ("Authorization", get_basic_auth_header());
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }

    function get_basic_auth_header(){
        return "Basic " + btoa(getUser()  + ":" + getPwd());
    }

    function get_url_domain(url){
        if(url != null){
            return url.split("/")[2];
        }
    }

    function set_ignore_urls(data){
        console.log(data);
        store.set(KEY_IGNORE_URL, data);
    }

    function get_ignore_urls(){
        data = store.get(KEY_IGNORE_URL);
        if (data == null){
            sync_ignore_urls();
        }
        return data;
    }

    function get_ignore_objs(url){
        var rst = []
        var domain = get_url_domain(url);
        var igurls = get_ignore_urls();
        for(var i=0; i<igurls.length; i++){
            if(igurls[i].url == domain){
                rst.push(igurls[i]);
            }
        }
        return rst;
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
        return get_ignore_url_obj(url) != null;
    }



    function ignore_url(url){
        url = get_url_domain(url);
        $.ajax({
                method: "POST",
                url: host + "/rest/settings/",
                data: {'url': url},
                beforeSend: auth_header
         })
        .done(function( data ) {
            console.log(data);
            sync_ignore_urls();
        });
    }

    function dont_ignore_url(url){
        var obj_list = get_ignore_objs(url);
        for(var i=0; i<obj_list.length; i++){
            var obj = obj_list[i];
            $.ajax({
                method: "DELETE",
                url: host + "/rest/settings/" + obj.id + "/",
                beforeSend: auth_header
                })
              .done(function() {
              });
        }
        sync_ignore_urls();
    }

    function sync_ignore_urls(){
         $.ajax({
                method: "GET",
                url: host + "/rest/settings/",
                beforeSend: auth_header
         })
        .done(function( data ) {
            set_ignore_urls(data);
        });
    }