angular.module('app')

.controller('AllVideosController', ['$scope', 'Video',
  function($scope, Video) {
    $scope.videos = Video.find();
  }
])

.controller('MyVideosController', ['$scope', 'Video', '$rootScope',
  function($scope, Video, $rootScope) {
    $scope.videos = Video.find({
      filter: {
        where: {
          /** note: normally we would use just the built-in userId,
            * but for the relational db we need to use the foreign key 'uservideoid' explicitly
           userId: $rootScope.currentUser.id
           */
           videotouserid: $rootScope.currentUser.id
        }
      }
    });
  }
])

.controller('AddVideoController', ['$scope', 'Video', '$state', '$rootScope',
  function($scope, Video, $state, $rootScope) {
  
    $scope.action = 'Add';
    $scope.video = {};
    $scope.isDisabled = false;
  
    $scope.submitVideo = function() {
      Video
      .create({
        title: $scope.video.title,
  url: $scope.video.url,
        username: $scope.video.username,
        date_published: $scope.video.date_published,
        votes: $scope.video.votes,
        likes: $scope.video.likes,
        dislikes: $scope.video.dislikes,
        userId: $rootScope.currentUser.id,
        videotouserid: $rootScope.currentUser.id
      })
      .$promise
      .then(
        // onsuccess
        function() {
          $state.go('all-videos');
        },
        // onerror
        function(err){
        }
      );
    };
  
  }
])
  
.controller('DeleteVideoController', ['$scope', 'Video', '$state', '$stateParams',
  function($scope, Video, $state, $stateParams) {
    Video
    .deleteById({ id: $stateParams.id })
    .$promise
    .then(function() {
      $state.go('my-videos');
    });
  }
])

.controller('EditVideoController', ['$scope', '$q', 'Video', '$stateParams', '$state',
  function($scope, $q, Video, $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.video = {};
    $scope.isDisabled = true;
    $q.all([
      Video
      .findById({ id: $stateParams.id })
      .$promise
    ])
    .then(function(data) {
      $scope.video = data[0];
    });
    $scope.submitVideo = function() {
      $scope.video
      .$save()
      .then(function(video) {
        $state.go('all-videos');
      },
      function(err){
        $state.go('forbidden');
      });
    };
  }
])
;