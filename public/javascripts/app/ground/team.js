var Team = function(config) {
    this.players = {};
    this.initConfig(config);
    this.draw();
};

Team.prototype.initConfig = function(config) {
    this.initialConfig = config || {};

    for (var key in this.initialConfig) {
        this[key] = this.initialConfig[key];
    }
};

Team.prototype.draw = function() {

    for(var i = 0; i < 6; i++) {
        this.players[i + 1] = new Player({
            size: 0.4,
            index: i + 1,
            width: this.width,
            scale: this.scale,
            paper: this.paper,
            margin: this.margin,
            fill: "hsb(0, 1, 1)"
        });
    }

};

Team.prototype.setPositions = function(positions, libero) {
    for(var key in this.players) {
        if (positions[key]) {
            this.players[key].setPosition(positions[key], libero, key);
        }
    }
};