'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $httpProvider: ng.IHttpProvider,
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    }).state('Add Movie', {
      url: '/add',
      templateUrl: '',
      controller: 'MovieAddController',
      controllerAs: 'vm'
    }).state('Movie Details', {
      url: '/details/:id',
      templateUrl: '',
      controller: 'MovieDetailsController',
      controllerAs: 'vm'
    }).state('Movie Update', {
      url: 'update/:id',
      templateUrl: '',
      controller: 'MovieUpdateController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
  });
}
