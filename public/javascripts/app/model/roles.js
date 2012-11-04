Vdt.model.Roles = [{
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

function getRoleLabel(value) {
    for (var i = 0, l = Vdt.model.Roles.length; i < l; i++) {
        if (Vdt.model.Roles[i].value === value) {
            return Vdt.model.Roles[i].label;
        }
    }
    return '';
}
