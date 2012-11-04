Vdt.service.Ground = function() {

    var ground = new Ground({
        height: 9,
        width: 18,
        margin: 2,
        renderTo: 'ground'
    });

    return {
        get: function() {
            return ground;
        },
        setPhase: function(phase) {
            setTimeout(function() {
                ground.setPhase(phase);
            }, 50);
        },
        toggleDrawing: function(enable) {
            drawingEnabled = enable;
            ground.toggleDrawing(enable);
        },
        isDrawingEnabled: function() {
            return ground.drawingEnabled;
        },
        removeDrawings: function() {
            ground.removeDrawings();
        }
    };

};

Vdt.app.service('ground', Vdt.service.Ground);
