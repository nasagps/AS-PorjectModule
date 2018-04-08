//机器名称：Lenovo-PC
//版本号：  V1.0.0.0
//创建人：  陈淦（Tommy）
//电子邮箱：1280328316@qq.com
//创建时间：2018/04/03 16:34:20 Tuesday
//描述：利用Angular.js的第三方ui-router做路由，使用Sea.js做js模块化工具，搭建的前端单页面应用项目框架。

/**
 * 初始化APP
 * **/
const mainControlValve = angular.module('moduleApp', ['ui.router']);

/**
 * 版本号
 * **/
const version = "?v1.0.0.0";

/**
 * 初始化MUI
 */
mui.init();

/**
 * 初始化事件
 * (包含所有页面的公共调用方法)
 * **/
var LoadEvent = function() {
    console.log("LoadEvent");
};

/**
 * 路由器
 * **/
mainControlValve.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/Index/Main');
    $stateProvider
        .state('Main', {
            url: '/Index/Main',
            templateUrl: 'Views/Index/main.html',
            resolve: {
                Load: function(loadCssMoudelService) {
                    loadCssMoudelService.Loading(["Css/Index/main.css" + version]);
                }
            }
        })
        .state('User', {
            url: '/Index/User',
            templateUrl: 'Views/Index/user.html',
            resolve: {
                Load: function(loadCssMoudelService) {
                    loadCssMoudelService.Loading(["Css/Index/user.css" + version]);
                }
            }
        });
});

/**
 * 控制器
 * **/
mainControlValve
    .controller('Main', function($scope, loadJsMoudelService) {
        loadJsMoudelService.Init(
            ["../Web/Javascript/Index/main.js" + version],
            function() { loadJsMoudelService.Load.mainJsMoudel($scope); }
        );
    })
    .controller('User', function($scope, loadJsMoudelService) {
        loadJsMoudelService.Init(
            ["../Web/Javascript/Index/user.js" + version],
            function() { loadJsMoudelService.Load.userJsMoudel($scope); }
        );
    });

/**
 * 服务
 * **/
mainControlValve
//Css加载服务
    .service('loadCssMoudelService', [function() {
        this.Loading = function(arrCssUrl) {
            if (arrCssUrl != null) {
                arrCssUrl.forEach(function(e) {
                    var cssLink = document.createElement('link');
                    cssLink.setAttribute("rel", "stylesheet");
                    cssLink.setAttribute("type", "text/css");
                    cssLink.setAttribute("href", e);
                    document.getElementById("css").appendChild(cssLink);
                });
            }
        };
    }])
    //Js加载服务
    .service('loadJsMoudelService', [function() {
        this.Init = function(arrJsUrl, loadJsMoude) {
            seajs.use(arrJsUrl, function(jsMoudel) {
                loadJsMoude();
            });
            this.Load = LoadEvent;
        };
    }]);