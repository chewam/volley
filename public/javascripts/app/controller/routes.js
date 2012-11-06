Vdt.controller.Routes = function ($scope, $location, $routeParams, $phases, $ground) {
    var phase,
        id = $routeParams.id,
        data = $routeParams.data;

    if (data) {
        phase = JSON.parse(atob(data));
        $phases.update(phase);
        $location.path('/' + phase.id);
    } else {
        $phases.select(id);
        $ground.setPhase($phases.getSelected());
        $ground.toggleDrawing(false);
        setTimeout(function() {
            $ground.redraw();
        }, 50);
    }

};

Vdt.controller.Routes.$inject = ['$scope', '$location', '$routeParams', 'phases', 'ground'];
