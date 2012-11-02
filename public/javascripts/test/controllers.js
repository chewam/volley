// 'use strict';

function getPhaseById(id) {
    for (var i = 0, l = Phases.items.length; i < l; i++) {
        if (Phases.items[i].id === id) {
            return Phases.items[i];
        }
    }
    return false;
}

function getPhaseIndexById(id) {
    for (var i = 0, l = Phases.items.length; i < l; i++) {
        if (Phases.items[i].id === id) {
            return i;
        }
    }
    return false;
}

function GroundCtrl($scope, $ground) {
    $ground.set(new Ground({
        height: 9,
        width: 18,
        margin: 2
    }));
}

GroundCtrl.$inject = ['$scope', 'ground'];

function MessageCtrl($scope) {
    $scope.message = Message;
    Message.$scope = $scope;
}

function PhaseDetailCtrl($scope, $routeParams, $ground) {
    $scope.roles = Roles;
    $scope.role = Roles[0];
    $scope.id = $routeParams.id;
    $scope.phase = getPhaseById($scope.id);

    $ground.on('playermove', function() {
        $scope.$digest();
    }, this);

    $ground.get().setPhase($scope.phase);

    $scope.destroy = function() {
        var index = getPhaseIndexById($scope.id);

        Phases.items.remove(index);
        if (Phases.items.length) {
            window.location.hash = '/phases/' + Phases.items[0].id;
        } else {
            window.location.hash = '/phases';
        }
    };
}

PhaseDetailCtrl.$inject = ['$scope', '$routeParams', 'ground'];

function PhasesListCtrl($scope, $message) {

    $scope.select = function(phase) {
        window.location.hash = '/phases/' + phase.id;
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
        $scope.phases = Phases.items;
        $scope.reset();
        setInterval(function() {
            $scope.save();
        }, 5000);
    };

    $scope.init();
}

PhasesListCtrl.$inject = ['$scope', 'message'];
