// 'use strict';

angular.module('test', []).
    factory('message', [function() {
        return function(message) {
            Message.visible = true;
            Message.text = message;
            console.log('Message', Message, message);
        };
    }]);
