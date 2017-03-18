angular.module('app', [
    'ui.router',
    'lbServices'
])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) { 
    $stateProvider
    
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'views/sign-up-form.html',
      controller: 'SignUpController'
    })
    
    .state('sign-up-success', {
      url: '/sign-up/success',
      templateUrl: 'views/sign-up-success.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthLoginController'
    })

    .state('logout', {
      url: '/logout',
      templateUrl: 'views/all-videos.html',
      controller: 'AuthLogoutController'
    }) 

    .state('all-videos', {
      url: '/all-videos',
      templateUrl: 'views/all-videos.html',
      controller: 'AllVideosController',
      authenticate: true
    })

    .state('my-videos', {
      url: '/my-videos',
      templateUrl: 'views/my-videos.html',
      controller: 'MyVideosController',
      authenticate: true
    })

    .state('add-video', {
      url: '/add-video',
      templateUrl: 'views/video-form.html',
      controller: 'AddVideoController',
      authenticate: true
    })

    .state('edit-video', {
      url: '/edit-video/:id',
      templateUrl: 'views/video-form.html',
      controller: 'EditVideoController',
      authenticate: true
    })
    
    .state('delete-video', {
      url: '/delete-video/:id',
      controller: 'DeleteVideoController',
      authenticate: true
    }) 
    
  }
]);