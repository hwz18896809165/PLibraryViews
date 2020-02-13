'use strict';
var app = angular.module('app', ['ui.router','oc.lazyLoad']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('main');
	$stateProvider
		.state('login',{
			url:'/login',
			templateUrl:'./modules/loginManagement/index.html',
			resolve:{
				loadMyCtrl:['$ocLazyLoad', function($ocLazyLoad) {
			        return $ocLazyLoad.load('./modules/loginManagement/index.js');
			    }]
			}
        })
        .state('register',{
            url:'/register',
            templateUrl:'./modules/registerManagement/index.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('./modules/registerManagement/index.js')
                }]
            }
        })
        .state('main',{
            url:"/main",
            templateUrl:"./modules/mainManagement/index.html",
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load("./modules/mainManagement/index.js")
                }]
            }
		})
		.state('main.userManagement',{
			url:'/userManagement',
			templateUrl:'./modules/userManagement/index.html',
			resolve:{
				loadMyCtrl:['$ocLazyLoad', function($ocLazyLoad) {
			        return $ocLazyLoad.load('./modules/userManagement/index.js');
			    }]
			}
		})

		.state('main.privilegeManagement',{
			url : '/privilegeManagement',
			templateUrl : './modules/privilegeManagement/index.html',
			resolve:{
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('./modules/privilegeManagement/index.js')
				}]
			}
		})
        
}])

angular.module('app').controller('root', function($scope,$state) {
	var ServerInterface = "userManagement/";
	function initUser(){
		sendRequests(ServerInterface+"checkLogin","POST","json",{userName : GetCookie("UserName")},function(res){
			if(res.userLoginType === true){
				$state.go("main");
			}
			else{
				$state.go("login");
			}
		})
	}
	initUser();
})