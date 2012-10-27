var Team = function(config) {

    $.extend(this, config || {});

    this.players = {};

    this.positions = new Positions();

    this.bench.x *= this.zoom;
    this.bench.y *= this.zoom;
    this.bench.width *= this.zoom;
    this.bench.height *= this.zoom;
    this.bench.margin *= this.zoom;
    this.bench.padding *= this.zoom;
    this.field.width *= this.zoom;
    this.field.margin *= this.zoom;
    // this.playerConfig.radius *= this.zoom;
};

Team.prototype.getShape = function() {

    var positions = {};

    var group = new Kinetic.Group();

    var bench = new Kinetic.Rect({
        x: this.bench.x,
        y: this.bench.y,
        width: this.bench.width,
        height: this.bench.height,
        fill: this.bench.fill,
        stroke: this.bench.stroke,
        strokeWidth: this.bench.strokeWidth
    });

    group.add(bench);

    this.positions.set('bench', {});

    for (var player, i = 0; i < this.limit; i++) {
        player = new Player($.extend({
            // x: this.bench.x / this.zoom + i * this.playerConfig.radius * 2 + 0.2 * i + this.bench.padding,
            // y: this.bench.y / this.zoom + this.bench.padding,
            x: 0,
            y: 0,
            number: i + 1,
            zoom: this.zoom
        }, this.playerConfig));

        group.add(player.getShape());

        this.players[i + 1] = player;

        this.positions.get('bench')[i + 1] = {
            x: this.bench.x + i * this.playerConfig.radius * this.zoom * 2 + (0.2 * this.zoom) * i + this.bench.padding,
            y: this.bench.y + this.bench.padding
        };
    }

    this.libero = new Player({
        x: 0,
        y: 0,
        radius: 0.4,
        fill: 'white',
        strokeWidth: 4,
        stroke: 'black',
        textFill: 'black',
        number: "L",
        visible: false,
        zoom: this.zoom
    });

    group.add(this.libero.getShape());

    return group;
};

Team.prototype.loadPosition = function(position) {
    position = this.positions.get(position);
    console.log('position', position);

    this.showLibero(false);

    for (var key in position) {
        this.players[key].setPosition(position[key], this.positions.get('bench')[key]);
        if (position[key].libero) {
            this.showLibero(position[key]);
        }
    }
};

Team.prototype.showLibero = function(position) {
    if (position.libero) {
        _libero = this.libero;
        console.warn(position);
        // this.libero.group.moveTo(position)
        // this.libero.group.setX(position.x);
        // this.libero.group.setY(position.y);
        // this.libero.group.getLayer().draw();
        this.libero.setPosition({
            x: position.x,
            y: position.y,
            role: 'libero',
            players: [position.libero]
        }, null);
        this.libero.group.show();
    } else {
        this.libero.group.hide();
    }
};
