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

function getRoleLabel(value) {
    for (var i = 0, l = Roles.length; i < l; i++) {
        if (Roles[i].value === value) {
            return Roles[i].label;
        }
    }
    return '';
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
}, {
    value: 'libero',
    label: 'Libero'
}];

var Message = {
    text: 'pof',
    visible: false
};

var Phases = {
    selected: null,
    items: JSON.parse(window.localStorage.getItem('phases')) || [],
    defaults: {
        name: '',
        id: '',
        libero: {x: 0, y: 0, player: '', role: 'libero'},
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
