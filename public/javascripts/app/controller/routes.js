Vdt.controller.Routes = function ($scope, $location, $routeParams, $phases, $ground) {
    var phase,
        id = $routeParams.id,
        data = $routeParams.data;

    if (data) {
        phase = JSON.parse(data);
        console.error('DATA', data, phase);
        $phases.update(phase);
        $location.path('/' + phase.id);
    } else {
        $phases.select(id);
        $ground.setPhase($phases.getSelected());
        $ground.toggleDrawing(false);
    }

};

Vdt.controller.Routes.$inject = ['$scope', '$location', '$routeParams', 'phases', 'ground'];
