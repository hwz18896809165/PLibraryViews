angular.module('app').controller('login', function($scope,$state) {
    $scope.loginManagementUserInfo = {};
    var ServerInterface = "userManagement/";
    clickElement("register",function(){
        $state.go("register");
    })
    clickElement("login",function(){
        if($scope.loginManagementUserInfo.userName === "" || $scope.loginManagementUserInfo.password === "" || isEmptyObject($scope.loginManagementUserInfo)){
            alert("必填信息不能为空");
            return ;
        }
        sendRequests(ServerInterface+"userLogin","POST","json",$scope.loginManagementUserInfo,function(res){
            initColumns();
            if(res.type === "SUCCESS"){
                SetCookie("UserKey",res.userKey);
                SetCookie("UserName",res.userName);
                $state.go("main");
            }else{
                alert(res.message);
            }
        })

    })
    
    function initColumns(){
        $scope.$apply(function(){
            $scope.loginManagementUserInfo = {
                userName : "",
                password : ""
            };
        })
    }

    
});
