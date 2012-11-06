Vdt.service.Phases = function() {
    var timer,
        phases = Vdt.model.Phases;

    var getPhaseById = function(id) {
        for (var i = 0, l = phases.items.length; i < l; i++) {
            if (phases.items[i].id === id) {
                return phases.items[i];
            }
        }
        return false;
    };

    var getPhaseIndexById = function(id) {
        for (var i = 0, l = phases.items.length; i < l; i++) {
            if (phases.items[i].id === id) {
                return i;
            }
        }
        return -1;
    };

    var sortByName = function(a, b) {
        var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();

        if (nameA < nameB) { //sort string ascending
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0; //default return value (no sorting)
    };

    var save = function(callback) {
        var items = JSON.stringify(phases.items),
            storedItems = window.localStorage.getItem('phases');

        if (items !== storedItems) {
            window.localStorage.setItem('phases', items);
            if (callback) callback();
        }
    };

    var create = function(name, data) {
        var phase = angular.copy(data || phases.defaults);

        phase.name = name;
        phase.id = btoa(name + (+new Date()));
        phases.items.push(phase);
        phases.items.sort(sortByName);

        return phase;
    };

    return {

        enableAutoSave: function(callback) {
            timer = setInterval(function() {
                save(callback);
            }, 5000);
        },

        get: function() {
            return phases;
        },

        select: function(id) {
            phases.selected = getPhaseById(id);
        },

        getSelected: function() {
            return phases.selected;
        },

        create: create,

        remove: function(id) {
            var index = getPhaseIndexById(id);

            phases.items.remove(index);
        },

        update: function(phase) {
            var index;

            if (phase && phase.id) {
                index = getPhaseIndexById(phase.id);
                if (index !== -1) {
                    phases.items[index] = phase;
                } else {
                    phases.items.push(phase);
                }
            }
        },

        duplicateSelected: function() {
            if (phases.selected) {
                return create('Copy of ' + phases.selected.name, phases.selected);
            }
        }

    };

};

Vdt.app.service('phases', Vdt.service.Phases);
