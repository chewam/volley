'use strict';

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

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

/**********/

var Roles = [{
    value: 'setter',
    label: 'Passeur'
}, {
    value: 'left',
    label: 'Gauche'
}, {
    value: 'middle',
    label: 'Central'
}, {
    value: 'opposite',
    label: 'Pointu'
}, {
    value: 'defender',
    label: 'Defenseur'
}];

var Message = {
    text: 'pof',
    visible: false
};

var Phases = {
    items: JSON.parse(window.localStorage.getItem('phases')) || [],
    defaults: {
        name: '',
        id: '',
        libero: {x: 0, y: 0, player: ''},
        positions: {
            1: {x: 0, y: 0, libero: false, role: 'defender', player: ''},
            2: {x: 0, y: 0, libero: false, role: 'setter', player: ''},
            3: {x: 0, y: 0, libero: false, role: 'left', player: ''},
            4: {x: 0, y: 0, libero: false, role: 'middle', player: ''},
            5: {x: 0, y: 0, libero: false, role: 'opposite', player: ''},
            6: {x: 0, y: 0, libero: false, role: 'defender', player: ''}
        }
    }
};
