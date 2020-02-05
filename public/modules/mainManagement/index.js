angular.module('app').controller('main', function ($scope, $state) {
    $scope.currentUser = GetCookie("UserName");
    $scope.showUserInfo = false;
    var userManagementServerInterface = "userManagement/";
    $scope.menus = [
        {
         text: "系统管理",
         enabled: true,
         subMenus:[
          {
           text: "用户管理",
           enabled: true,
           action:"main.userManagement"
          },
          {
           text: "角色管理",
           enabled: true,
           action:"/role"   
          },
          {
           text: "权限管理",
           enabled: true,
           action:"/access"   
          }
         ]
        },
       ]; 

    clickElement("logout",function(){
        var res = confirm("您确定要退出吗?");
        if(res === true){
            sendRequests(userManagementServerInterface+"userLogout","POST",'json',{userName : GetCookie("UserName")},function(res){
                $state.go("login");
            })
        }
    })

    $scope.setContent = function(content){
        $state.go(content)
    }
    $state.go("main.userManagement")

    listenMouseMoveByClassName("user-head-background","user-head-background-up",function(){
        console.log(GetCookie("UserName"))
    },function(){})
});
