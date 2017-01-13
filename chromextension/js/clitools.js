/**
 * Created by likangwei on 16/7/29.
 */
var timestamp_count_map = {};

function waitResult(timestamp, func){
    if(timestamp in timestamp_count_map){
        timestamp_count_map[timestamp] = timestamp_count_map[timestamp] + 1
    }else{
        timestamp_count_map[timestamp] = 0;
    }
    if(timestamp_count_map[timestamp] > 20){
        return;
    }
    console.log("wait result " + timestamp);
    var msg = {action: ACTIONS.WAIT_RESULT, timestamp: timestamp};
    chrome.runtime.sendMessage(msg , function(response){
        console.log("wait result success! " + JSON.stringify(response));
        if(response.success){
            if(response.body.status == ACTION_STATUS.RUNNING){
                setTimeout(function(){
                    waitResult(timestamp, func);
                }, 500);
            }else if (response.body.status == ACTION_STATUS.FINISH){
                func(response['body']['result']);
            }else{
                console.log("无效的返回状态码");
            }
        }else{
            console.log("返回失败");
        }
    });
}
