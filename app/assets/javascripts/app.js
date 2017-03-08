(function(ng) {
        ng.module('TriviaApp', ['ui.router', 'templates', 'LocalStorageModule']);

        ng.module('TriviaApp').config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $urlRouterProvider.when('/', '/' + 'login');

            $stateProvider.state('TriviaParent', {
                url: '/',
                abstract: true,
                template: '<ui-view></ui-view>',
            }).state('TriviaParent.login', {
                url: 'login',
                templateUrl: 'login.html',
                controller: "LoginController as login"
            }).state('TriviaParent.profile', {
                url: 'profile',
                templateUrl: 'userprofile.html',
                controller: "LoginController as login"
            }).state('TriviaParent.game', {
                url: 'game',
                templateUrl: 'game.html',
                controller: "GameController as game"
            }).state('TriviaParent.leader', {
                url: 'leaderboard',
                templateUrl: 'leader.html',
                controller: "GameController as game"
            }).state('TriviaParent.logout', {
                url: 'logout',
                templateUrl: 'login.html',
            });
        });


        })(angular);
