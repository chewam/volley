Vdt.controller.Phases = function ($scope, $phases) {

    $scope.getActiveClass = function(id) {
        return ($phases.getSelected() || {}).id === id ? 'active' : '';
    };

};

Vdt.controller.Phases.$inject = ['$scope', 'phases'];
