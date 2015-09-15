/*
 * Licensed under the Apache License, Version 2.0
 * See accompanying LICENSE file.
 */

angular.module('dashboard', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  'ui.select',
  'cfp.loadingBarInterceptor',
  'ngFileUpload',
  'dashing'
])

  // configure routes
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      'use strict';

      $urlRouterProvider
        .when('', '/')
        .when('/', '/cluster/master')
        .otherwise(function($injector, $location) {
          // redirects to parent state (recursively)
          var parentUrl = _.initial($location.path().split('/')).join('/');
          $location.path(parentUrl);
        });

      $stateProvider
        .state('cluster', {
          abstract: true, // todo: we have a sidebar for cluster only
          url: '/cluster',
          templateUrl: 'views/cluster/overview.html'
        });
      // Please check every controller for corresponding state definition
    }])

  // configure loading bar effect
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    'use strict';
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 200;
  }])

  // disable caching for ajax calls to make MSIE happy
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = angular.merge({
      'If-Modified-Since': new Date(0),
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }, $httpProvider.defaults.headers.get);
  }])

  // constants
  .constant('conf', {
    restapiProtocol: 'v1.0',
    restapiRoot: location.origin,
    restapiQueryInterval: 2000, // 2 second
    metricsChartDataCount: 4 * 15, // 15 minutes data
    metricsChartSamplingRate: 1000 * 15 // 15 second
  })
;