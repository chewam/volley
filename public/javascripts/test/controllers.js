// 'use strict';

function GroundCtrl($scope, $ground) {
    $ground.set(new Ground({
        height: 9,
        width: 18,
        margin: 2
    }));
}

GroundCtrl.$inject = ['$scope', 'ground'];

/**********/

function MessageCtrl($scope) {
    $scope.message = Message;
    Message.$scope = $scope;
}

/**********/

function PhaseDetailCtrl($scope, $routeParams, $ground) {
    $scope.roles = Roles;
    $scope.showDetails = false;
    $scope.liberoIndex = false;
    $scope.id = $routeParams.id;
    $scope.phase = getPhaseById($scope.id);

    console.log('phase', $scope.phase);

    $ground.on('playermove', function() {
        $scope.$digest();
    }, this);

    $ground.get().setPhase($scope.phase);

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

PhaseDetailCtrl.$inject = ['$scope', '$routeParams', 'ground'];

/**********/

function PhasesListCtrl($scope, $message) {

    $scope.select = function(phase) {
        if (phase) {
            $scope.phase = phase;
            window.location.hash = '/phases/' + phase.id;
        }
    };

    $scope.create = function() {
        if ($scope.newPhase.name) {
            $scope.newPhase.id = btoa($scope.newPhase.name);
            $scope.phases.push($scope.newPhase);
            $scope.select($scope.newPhase);
            $scope.reset();
        }
    };

    $scope.reset = function() {
        $scope.newPhase = angular.copy(Phases.defaults);
    };

    $scope.save = function() {
        Phases.items = $scope.phases;
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
        $scope.phase = false;
        $scope.phases = Phases.items;
        $scope.select($scope.phases[0]);
        $scope.reset();
        setInterval(function() {
            $scope.save();
        }, 5000);
    };

    $scope.init();
}

PhasesListCtrl.$inject = ['$scope', 'message'];
