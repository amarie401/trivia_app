(function(ng) {
  ng.module('TriviaApp', ['ui.router', 'templates']);

  ng.module('TriviaApp').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'main/_home.html',
      controller: 'MainController'
    });
  });


})(angular);
