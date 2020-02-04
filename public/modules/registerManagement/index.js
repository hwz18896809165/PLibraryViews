angular.module('app').controller('register', function($scope,$state) {
    $scope.userInfo = {};
    $scope.showCheckCode = false;
    $scope.checkUserCode = "";
    var ServerInterface = "userManagement/";

    clickElement("backToLogin",function(){
        $state.go("login");
    });

    clickElement("backToRegister",function(){
        $scope.$apply(function(){
            $scope.showCheckCode = false;
        });
        initColumns();
    });

    clickElement("sign",function(){
        if($scope.userInfo.userName === "" || $scope.userInfo.password === "" || $scope.userInfo.sex === "" || $scope.userInfo.email === ""){
            alert("必填信息不能为空");
            return ;
        }
        if($("#password").val() !== $("#password2").val()){
            alert("密码输入不一致");
            return;
        }
        sendRequests(ServerInterface+"userRegister","POST","json",$scope.userInfo,function(res){
            if(res.type === "ERROR"){
                alert(res.message);
                initColumns()
            }else{
                SetCookie("ConnectingKey",res.connectingKey);
                $scope.$apply(function(){
                    $scope.showCheckCode = true;
                });
            }
        })
    })

    clickElement("signAgain",function(){
        if($scope.checkUserCode === ""){
            alert("验证码不能为空");
            return ;
        }
        sendRequests(ServerInterface+"addUser","POST","json",{
            connectingKey : GetCookie("ConnectingKey"),
            checkUserCode : $scope.checkUserCode
        },function(res){
            if(res.type === "SUCCESS"){
                sendRequests(ServerInterface+"userLogin","POST","json",$scope.userInfo,function(res){
                    $scope.userInfo = {};
                    if(res.type === "SUCCESS"){
                        SetCookie("UserKey",res.userKey);
                        SetCookie("UserName",res.userName);
                        $state.go("main");
                    }else{
                        alert(res.message);
                    }
                })
            }
            else{
                alert(res.message);
            }
            
        })
    })

    clickElement("selectMale",function(){
        $scope.$apply(function(){
            $scope.userInfo.sex = "男";
        })
    })
    
    clickElement("selectFeMale",function(){
        $scope.$apply(function(){
            $scope.userInfo.sex = "女";
        })
    })
    function initColumns(){
        $scope.$apply(function(){
            $scope.userInfo = {
                userName : "",
                password : "",
                sex : "",
                phoneNumber : "",
                email : ""
            };
            $scope.checkUserCode = "";
            $("#password2").val("");
        })
    }
})