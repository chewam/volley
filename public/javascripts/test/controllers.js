// 'use strict';

function MainCtrl($scope, $phaseService) {
    $phaseService.set(null);
}

MainCtrl.$inject = ['$scope', 'phaseService'];

/**********/

function GroundCtrl($scope, $ground) {
    $scope.phase = false;

    $scope.$on('phaseselect', function(scope, phase) {
        $scope.phase = phase;
        if (phase) {
            setTimeout(function() {
                $scope.createGround();
                $ground.get().setPhase(phase);
            }, 50);
        }
    });

    $scope.createGround = function() {
        if (!$ground.get()) {
            $ground.set(new Ground({
                height: 9,
                width: 18,
                margin: 2,
                renderTo: 'ground'
            }));
        }
    };

}

GroundCtrl.$inject = ['$scope', 'ground', 'phaseService'];

/**********/

function MessageCtrl($scope) {
    $scope.message = Message;
    Message.$scope = $scope;
}

/**********/

function PhaseDetailCtrl($scope, $location, $routeParams, $ground, $phaseService) {
    $scope.roles = Roles;
    $scope.detailsVisible = false;
    $scope.liberoIndex = false;
    $scope.id = $routeParams.id;
    $scope.phase = getPhaseById($scope.id);
    $phaseService.set($scope.phase);

    $ground.on('playermove', function() {
        $scope.$digest();
    }, this);

    $ground.on('drawing', function() {
        $scope.$digest();
    }, this);

    $scope.toggleDetails = function() {
        if(!$scope.detailsVisible) {
            $scope.detailsVisible = 'active';
        } else {
            $scope.detailsVisible = false;
        }
    };

    $scope.destroy = function() {
        var index = getPhaseIndexById($scope.id);

        Phases.items.remove(index);
        if (Phases.items.length) {
            window.location.hash = '/phases/' + Phases.items[0].id;
        } else {
            window.location.hash = '/phases';
        }
    };

    $scope.onLiberoClick = function(index) {
        for (var key in $scope.phase.positions) {
            if (key != index && $scope.phase.positions[key].libero) {
                $scope.phase.positions[key].libero = false;
            }
        }
        $ground.get().setPhase($scope.phase);
    };

    $scope.toggleDrawing = function() {
        if ($scope.phase) {
            if ($scope.phase.drawingEnabled) {
                $scope.phase.drawingEnabled = false;
            } else {
                $scope.phase.drawingEnabled = 'active';
            }
        }
    };

    $scope.eraseDrawings = function() {
        $ground.get().removeDrawings();
        this.phase.drawings = null;
    };

    $scope.exportAsImage = function() {
        var data,
            el = document.getElementById('canvas'),
            svg = document.getElementById('ground').innerHTML;

        canvg('canvas', svg);
        data = el.toDataURL('image/png');
        $('img', $('#modal').modal('show')).attr('src', data);
    };

    $scope.showPermalink = function() {
        var phase = angular.copy($scope.phase),
            link = $location.protocol() +
            '://' + $location.host() +
            ($location.port() ? ':'+$location.port() : '') +
            '/test/#/phases/';

        phase.name = 'Copy of ' + phase.name;
        phase.id = btoa(phase.name);
        link += phase.id + '/' + JSON.stringify(phase);

        // link = 'http://volley.chewam.com/';

        $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
            format: 'json',
            apiKey: 'R_a81a7f598dff7efa0a0cf2c5cbe19681',
            login: 'goldledoigt',
            longUrl: link
        }, function(response) {
            if (response.status_text === 'OK') {
                link = response.data.url;
            }
            console.log('showPermalink', response, response.data.url);
            $('.modal-body a', $('#permalink-modal').modal('show'))
            .attr('href', link)
            .text(link);
        });
    };

}

PhaseDetailCtrl.$inject = ['$scope', '$location', '$routeParams', 'ground', 'phaseService'];

/**********/

function PhasesListCtrl($scope, $message) {

    $scope.select = function(phase) {
        if (phase) {
            window.location.hash = '/phases/' + phase.id;
        }
    };

    $scope.create = function() {
        if ($scope.newPhase.name) {
            $scope.newPhase.id = btoa($scope.newPhase.name);
            $scope.phases.items.push($scope.newPhase);
            $scope.select($scope.newPhase);
            $scope.reset();
        }
    };

    $scope.reset = function() {
        $scope.newPhase = angular.copy(Phases.defaults);
    };

    $scope.save = function() {
        Phases.items = $scope.phases.items;
        // if (Phases.items && Phases.items.length) {
            var phases = JSON.stringify(Phases.items),
                storedPhases = window.localStorage.getItem('phases');

            if (phases !== storedPhases) {
                $message('Saving...');
                window.localStorage.setItem('phases', phases);
            }
        // }
    };

    $scope.init = function() {
        $scope.phases = Phases;
        $scope.reset();
        setInterval(function() {
            $scope.save();
        }, 5000);
    };

    $scope.init();
}

PhasesListCtrl.$inject = ['$scope', 'message'];

/**********/

function ImportPhaseCtrl($scope, $routeParams) {
    var phase = JSON.parse($routeParams.data);
    console.warn('ImportPhaseCtrl', $routeParams.id, $routeParams.data);

    Phases.items.push(phase);
    window.location.hash = '/phases/' + $routeParams.id;
}

ImportPhaseCtrl.$inject = ['$scope', '$routeParams'];
