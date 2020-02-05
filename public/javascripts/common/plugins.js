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

//格式化时间
Date.prototype.Format = function (fmt) { 
    var o = { 
        "M+": this.getMonth() + 1, //月份  
        "d+": this.getDate(), //日  
        "H+": this.getHours(), //小时  
        "m+": this.getMinutes(), //分  
        "s+": this.getSeconds(), //秒  
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
        "S": this.getMilliseconds() //毫秒  
    }; 
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
    for (var k in o) 
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); 
    return fmt; 
}


//dataTablesSettings 
$.dataTablesSettings = {
    language: {
        "decimal": "",//小数的小数位符号  比如“，”作为数字的小数位符号
        "emptyTable": "没有数据哟~~",//没有数据时要显示的字符串
        "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条",//左下角的信息，变量可以自定义，到官网详细查看
        "infoEmpty": "无记录",//当没有数据时，左下角的信息
        "infoFiltered": "(从 _MAX_ 条记录过滤)",//当表格过滤的时候，将此字符串附加到主要信息
        "infoPostFix": "",//在摘要信息后继续追加的字符串
        "thousands": ",",//千分位分隔符
        "lengthMenu": "每页 _MENU_ 条记录",//用来描述分页长度选项的字符串
        "loadingRecords": "加载中...",//用来描述数据在加载中等待的提示字符串 - 当异步读取数据的时候显示
        "processing": "处理中...",//用来描述加载进度的字符串
        "search": "搜索",//用来描述搜索输入框的字符串
        "zeroRecords": "没有找到",//当没有搜索到结果时，显示
        "paginate": {
          "first": "首页",
          "previous": "上一页",
          "next": "下一页",
          "last": "尾页"
        }
      },
      processing: true,//是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
      lengthChange: true,//是否允许用户改变表格每页显示的记录数
      orderMulti: false,  //启用多列排序
      ordering: false,//使用排序
      bStateSave: true,//记录cookie
      paging: true,//是否分页
      pagingType: "full_numbers",//除首页、上一·页、下一页、末页四个按钮还有页数按钮
      searching: false,//是否开始本地搜索
      stateSave: false,//刷新时是否保存状态
      autoWidth: true,//自动计算宽度
      deferRender: true,//延迟渲染
      serverSide: true,//开启服务器模式
}

//拷贝对象
function copy(obj){
    return JSON.parse(JSON.stringify(obj))
}


//绑定监听鼠标移动事件
function listenMouseMoveByClassName(className,setClassName,callback1,callback2){
    $("."+className).hover(
        function(){
            $("."+className).addClass(setClassName);
            callback1();
        },
        function(){
            $("."+className).removeClass(setClassName);
            callback2();
        }
    )
}