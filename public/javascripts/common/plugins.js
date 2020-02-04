var ServerUrl = "http://127.0.0.1:3000/";

var pageHost = "http://127.0.0.1:8080/";

//设置COOKIE
function SetCookie(key,value) {
    $.cookie(key, value);
}
//读取Cookie
function GetCookie(key) {
    if ($.cookie(key) != null) {
        var res = $.cookie(key);
        return res;
    } else {
        return null;
    }
}
//删除Cookie
function DelCookie() {
    $.cookie(key, null);
}

//发送请求到Server端
function sendRequests(url,type = "GET", dataType = "json",data={},callback){
    data.userKey = GetCookie("UserKey");
    $.ajax({
        url:ServerUrl+url,
        type:type,
        dataType:dataType,
        data:data,
        success:callback
    });
}

//判断对象是否为空
var isEmptyObject = function(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
}

//点击事件绑定
var clickElement = function(id,callback){
    $("#"+id).off().on('click',callback);
    return false;
}


//刷新页面
var reloadRoute = function(){
    window.location.reload();
}