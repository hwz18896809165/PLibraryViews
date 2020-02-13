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
           action:"main.privilegeManagement"   
          }
         ]
        },
       ]; 
    $scope.setContent = function(content){
        $state.go(content)
    }
    $state.go("main.userManagement")

    listenMouseMoveBySelector(".user-head-background","user-head-background-up",function(){})
    listenMouseMoveBySelector("#logout","gray",logout)
    listenMouseMoveBySelector("#personalInfo","gray",showUserInfo)
    listenMouseMoveBySelector("#updatePassword","gray",function(){})

    $(".user-head-background").on('click',function(e){
        stopPropagation(e);
        $(".main-user-control").fadeIn();
    })
    $(document).bind('click',function(){ 
        $(".main-user-control").fadeOut();
    });
    
    function showUserInfo(){
        console.log("show")
    }

    function logout(){
        var res = confirm("您确定要退出吗?");
        if(res === true){
            sendRequests(userManagementServerInterface+"userLogout","POST",'json',{userName : GetCookie("UserName")},function(res){
                $state.go("login");
            })
        };
    };
    
});
