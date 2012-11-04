Vdt.controller.Phase = function ($scope, $phases) {
    
    $scope.phases = $phases.get();

};

Vdt.controller.Phase.$inject = ['$scope', 'phases'];
