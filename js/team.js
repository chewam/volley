var Team = function(config) {

    $.extend(this, config || {});

    this.bench.x *= this.zoom;
    this.bench.y *= this.zoom;
    this.bench.width *= this.zoom;
    this.bench.height *= this.zoom;
    this.bench.margin *= this.zoom;
    this.field.width *= this.zoom;
    this.field.margin *= this.zoom;
};

Team.prototype.getShape = function() {

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

    for (var player, i = 0; i < this.limit; i++) {
        player = new Player($.extend({
            x: this.bench.x + (i * 45),
            y: this.bench.y,
            number: i + 1
        }, this.playerConfig));
        group.add(player.getShape());
    }

    return group;
};
