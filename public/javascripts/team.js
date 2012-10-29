var Team = function(config) {

    $.extend(this, config || {});

    this.players = {};

    this.positions = new Positions(this.positions);

    this.bench.x *= this.zoom;
    this.bench.y *= this.zoom;
    this.bench.width *= this.zoom;
    this.bench.height *= this.zoom;
    this.bench.margin *= this.zoom;
    this.bench.padding *= this.zoom;
    this.field.width *= this.zoom;
    this.field.margin *= this.zoom;
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

    this.positions.set('bench', {
        name: 'Bench',
        positions: {}
    });

    for (var player, i = 0; i < this.limit; i++) {
        player = new Player($.extend({
            x: 0,
            y: 0,
            number: i + 1,
            zoom: this.zoom,
            field: this.field
        }, this.playerConfig));

        group.add(player.getShape());

        this.players[i + 1] = player;

        this.positions.get('bench').positions[i + 1] = {
            x: this.bench.x / this.zoom + i * this.playerConfig.radius * 2 + (0.2) * i + this.bench.padding / this.zoom - this.field.margin / this.zoom,
            y: (this.bench.y - this.field.margin + this.bench.padding) / this.zoom
        };

        player.group.on('dragend', this.playerDragEndHandler(player));
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
        zoom: this.zoom,
        field: this.field
    });

    group.add(this.libero.getShape());

    return group;
};

Team.prototype.loadPosition = function(position) {
    position = this.positions.get(position);

    this.showLibero(false);

    for (var key in position.positions) {
        this.players[key].setPosition(position.positions[key], this.positions.get('bench').positions[key]);
        if (position.positions[key].libero) {
            this.showLibero(position.positions[key]);
        }
    }
};

Team.prototype.showLibero = function(position) {
    if (position.libero) {
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

Team.prototype.playerDragEndHandler = function(player) {
    return (function (event) {
        console.log('dragend', player.position, event.layerX, event.layerY, this.zoom, this.playerConfig.radius);
        player.position.x = (event.layerX - this.field.margin) / this.zoom - this.playerConfig.radius;
        player.position.y = (event.layerY - this.field.margin) / this.zoom - this.playerConfig.radius;
    }).bind(this);
};
