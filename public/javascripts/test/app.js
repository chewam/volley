angular.module('test', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/phases', {
                templateUrl: '/templates/empty.html',
                controller: MainCtrl
            }).
            when('/phases/:id', {
                templateUrl: '/templates/phase-detail.html',
                controller: PhaseDetailCtrl
            }).
            otherwise({redirectTo: '/phases'});

    }]).
    factory('message', [function() {
        return function(message) {
            Message.visible = true;
            Message.text = message;
            Message.$scope.$digest();
            setTimeout(function() {
                Message.text = '';
                Message.visible = false;
                Message.$scope.$digest();
            }, 3000);
            console.log('Message', Message, message);
        };
    }]).
    factory('ground', [function() {
        var ground, callback;

        return {
            set: function(g) {
                ground = g;
            },
            get: function() {
                return ground;
            },
            on: function(eventName, handler, scope) {
                if (callback) {
                    eve.off(eventName, callback);
                }
                callback = handler.bind(scope);
                eve.on(eventName, callback);
            }
        };
    }]).
    service('phaseService', function($rootScope) {
        var p = null;

        return {
            set: function(phase) {
                p = phase;
                $rootScope.$broadcast('phaseselect', p);
            },
            get: function(phase) {
                return p;
            }
        };
    });
