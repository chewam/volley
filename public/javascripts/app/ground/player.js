var Player = function(config) {
    this.initConfig(config);
    this.draw();
};

Player.prototype.initConfig = function(config) {
    this.initialConfig = config || {};

    for (var key in this.initialConfig) {
        this[key] = this.initialConfig[key];
    }
};

Player.prototype.onMoveStart = function(x, y, event) {
    this.shape.ox = this.shape.attr('cx');
    this.shape.oy = this.shape.attr('cy');
    this.shape.animate({r: this.size * 1.2, opacity: 0.25}, 500, '>');
};

Player.prototype.onMove = function(dx, dy) {
    var x = this.shape.ox + dx / this.scale,
        y = this.shape.oy + dy / this.scale;

    this.shape.attr({cx: x, cy: y});
    this.detail.attr({x: x * this.scale, y: (y + this.size + 0.1) * this.scale});
    this.number.attr({x: x * this.scale, y: y * this.scale});
};

Player.prototype.onMoveEnd = function() {
    var x = this.width / 2 - this.shape.attr('cx') + this.margin,
        y = this.shape.attr('cy') - this.margin;

    this.position.x = x;
    this.position.y = y;
    eve('playermove', this, x, y);
    this.shape.animate({r: this.size, opacity: 0.5}, 500, '>');
};

Player.prototype.draw = function() {
    var x = this.margin + (this.index - 1) * (this.size * 2 + 0.5),
        y = this.margin / 2;

    this.shape = this.paper.circle(x, y, this.size);
    this.number = this.paper.text(x * this.scale, y * this.scale, this.index);
    this.detail = this.paper.text(x * this.scale, (y + this.size + 0.2) * this.scale, '');
    this.shape.transform('s'+this.scale+','+this.scale+',0,0');
    this.shape.attr({
        fill: this.fill,
        stroke: 'none',
        opacity: 0.5
    });
    this.shape.drag(this.onMove, this.onMoveStart, this.onMoveEnd, this, this, this);
};

Player.prototype.setPosition = function(position, libero, index) {
    this.position = position;
    if (position.x || position.y) {
        this.move(position.x, position.y);
    } else {
        var x = this.margin + (this.index - 1) * (this.size * 2 + 0.5),
            y = -(this.margin / 2);

        this.move(x, y);
    }

    if (position.libero) {
        this.setDetail(libero);
        this.setAppearance(libero);
    } else {
        this.setDetail(position);
        this.setAppearance(position);
    }
};

Player.prototype.setAppearance = function(position) {
    if (position.role === 'libero') {
        this.number.attr({fill: 'black'});
        this.shape.attr({stroke: 1, fill: 'white'});
    } else if (position.role === 'setter') {
        this.shape.attr({fill: 'black'});
        this.number.attr({fill: 'white'});
    } else {
        this.shape.attr({stroke: 'none', fill: this.fill});
        this.number.attr({fill: 'black'});
    }
};

Player.prototype.setDetail = function(position) {
    var text = getRoleLabel(position.role);

    if (position.player && position.player.length) {
        text = position.player + '\n' + text;
    }
    this.detail.attr({text: text});
};

Player.prototype.move = function(x, y) {
    x = this.width / 2 - x + this.margin;
    y = y + this.margin;
    this.shape.attr({cx: x, cy: y});
    this.detail.attr({x: x * this.scale, y: (y + this.size + 0.3) * this.scale});
    this.number.attr({x: x * this.scale, y: y * this.scale});
};
