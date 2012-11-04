Vdt.model.Phases = {
    newPhase: null,
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
