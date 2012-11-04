Vdt.controller.Routes = function ($scope, $routeParams, $phases, $ground) {
    var id = $routeParams.id;

    $phases.select(id);
    $ground.setPhase($phases.getSelected());
    $ground.toggleDrawing(false);
};

Vdt.controller.Routes.$inject = ['$scope', '$routeParams', 'phases', 'ground'];
