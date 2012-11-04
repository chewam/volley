Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

/**********/

var Vdt = {
    model: {},
    service: {},
    controller:{},
    app: angular.module('Vdt', [])
};

Vdt.app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/:id', {
            template: ' ',
            // templateUrl: '/templates/empty.html',
            controller: Vdt.controller.Routes
        })
        .otherwise({
            redirectTo: '/'
        });

}]);
