// 'use strict';

function MainCtrl($scope, $phaseService) {
    console.log('MainCtrl');
    $phaseService.set(null);
}

MainCtrl.$inject = ['$scope', 'phaseService'];

/**********/

function GroundCtrl($scope, $ground) {
    $scope.phase = false;

    console.log('GroundCtrl', $scope.phase);

    $scope.$on('phaseselect', function(scope, phase) {
        console.error('phaseselect', this, arguments);

        $scope.phase = phase;
        setTimeout(function() {
            $scope.createGround();
            $ground.get().setPhase(phase);
        }, 50);
    });

    $scope.createGround = function() {
        if (!$ground.get()) {
            $ground.set(new Ground({
                height: 9,
                width: 18,
                margin: 2
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

function PhaseDetailCtrl($scope, $routeParams, $ground, $phaseService) {
    $scope.roles = Roles;
    $scope.showDetails = false;
    $scope.liberoIndex = false;
    $scope.id = $routeParams.id;
    $scope.phase = getPhaseById($scope.id);
    $phaseService.set($scope.phase);

    // $scope.$emit('someEvent', [42]);
    console.log('PhaseDetailCtrl', $scope.phase, $routeParams.id);

    $ground.on('playermove', function() {
        $scope.$digest();
    }, this);

    // $ground.get().setPhase($scope.phase);

    $scope.toggleDetails = function() {
        if(!$scope.showDetails) {
            $scope.showDetails = 'active';
        } else {
            $scope.showDetails = false;
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

    $scope.onLiberoClick = function(position, index) {
        for (var key in $scope.phase.positions) {
            if (key !== index && $scope.phase.positions[key].libero) {
                $scope.phase.positions[key].libero = false;
            }
        }
    };

}

PhaseDetailCtrl.$inject = ['$scope', '$routeParams', 'ground', 'phaseService'];

/**********/

function PhasesListCtrl($scope, $message) {

    console.log('PhasesListCtrl');

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
        if (Phases.items && Phases.items.length) {
            var phases = JSON.stringify(Phases.items),
                storedPhases = window.localStorage.getItem('phases');

            if (phases !== storedPhases) {
                $message('Saving...');
                window.localStorage.setItem('phases', phases);
            }
        }
    };

    $scope.init = function() {
        // $scope.phase = false;
        $scope.phases = Phases;
        // $scope.select($scope.phases[0]);
        $scope.reset();
        setInterval(function() {
            $scope.save();
        }, 5000);
    };

    $scope.init();
}

PhasesListCtrl.$inject = ['$scope', 'message'];
