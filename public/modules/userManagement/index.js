angular.module('app').controller('userManagement', function($scope,$state) {
  var ServerInterface = "userManagement/";
  var userInfoDataTablesSettings = copy($.dataTablesSettings);
  $scope.userInfo = {};
  function getColumns(){
    return [
      {data: "userId", defaltContent:"空"},
      {data: "userName", defaultContent:"空"},
      {data: "identity",defaultContent:"空"}, 
      {data: "sex", defaultContent: "未知性别"},
      {data: "phoneNumber",defaultContent:"空"},
      {data:"email",defaultContent:"空"},
      {data: "creationTime", defaultContent: "未知",render:function (date) { return new Date(date).Format("yyyy-MM-dd HH:mm:ss") }}
    ];
  }
  function getAjaxParams(){
    return {
      "url": ServerUrl + ServerInterface + "getAllUser",
      "type": 'POST',
      //绑定额外参数
      "data":{
        userName : GetCookie("UserName"),
        userKey : GetCookie("UserKey")
      }
    };
  }
  function initDataTable(){
    userInfoDataTablesSettings.columns = getColumns();
    userInfoDataTablesSettings.ajax = getAjaxParams();
    return $("#userInfo").dataTable(userInfoDataTablesSettings);
  }

  clickElement("search",function(){
    userInfoDataTablesSettings.ajax.data.search = $scope.userInfo;
    dataTable.fnDestroy(false);
    dataTable = $("#userInfo").dataTable(userInfoDataTablesSettings);
    //搜索后跳转到第一页
    dataTable.fnPageChange(0);
  })

  clickElement("refresh",function(){
    $scope.$apply(function(){
      $scope.userInfo = {};
    })
    userInfoDataTablesSettings.ajax.data.search = $scope.userInfo;
    dataTable.fnDestroy(false);
    dataTable = $("#userInfo").dataTable(userInfoDataTablesSettings);
    //搜索后跳转到第一页
    dataTable.fnPageChange(0);
  })
  var dataTable = initDataTable();
})