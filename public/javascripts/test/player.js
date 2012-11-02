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
    this.shape.ox = this.shape.attr("cx");
    this.shape.oy = this.shape.attr("cy");
    this.shape.animate({r: this.size * 1.2, opacity: 0.25}, 500, ">");
};

Player.prototype.onMove = function(dx, dy) {
    var x = this.shape.ox + dx / this.scale.width,
        y = this.shape.oy + dy / this.scale.width;

    this.shape.attr({cx: x, cy: y});
    this.detail.attr({x: x * this.scale.width, y: (y + this.size + 0.1) * this.scale.width});
    this.number.attr({x: x * this.scale.width, y: y * this.scale.width});
};

Player.prototype.onMoveEnd = function() {
    var x = this.width / 2 - this.shape.attr("cx") + this.margin,
        y = this.shape.attr("cy") - this.margin;

    this.position.x = x;
    this.position.y = y;
    eve("playermove", this, x, y);
    this.shape.animate({r: this.size, opacity: 0.5}, 500, ">");
};

Player.prototype.draw = function() {
    var x = this.margin + (this.index - 1) * (this.size * 2 + 0.1),
        y = this.margin / 2;

    this.shape = this.paper.circle(x, y, this.size);
    this.number = this.paper.text(x * this.scale.width, y * this.scale.width, this.index);
    this.detail = this.paper.text(x * this.scale.width, (y + this.size + 0.1) * this.scale.width, '');
    this.shape.transform('s'+this.scale.width+','+this.scale.width+',0,0');
    this.shape.attr({
        fill: "hsb(0, 1, 1)",
        stroke: "none",
        opacity: 0.5
    });
    this.shape.drag(this.onMove, this.onMoveStart, this.onMoveEnd, this, this, this);
};

Player.prototype.setPosition = function(position) {
    this.position = position;
    this.setDetail(position);
    this.move(position.x, position.y);
};

Player.prototype.setDetail = function(position) {
    var text = position.role;

    if (position.player && position.player.length) {
        text = position.player + '\n' + text;
    }
    this.detail.attr({text: text});
};

Player.prototype.move = function(x, y) {
    x = this.width / 2 - x + this.margin;
    y = y + this.margin;
    this.shape.attr({cx: x, cy: y});
    this.detail.attr({x: x * this.scale.width, y: (y + this.size + 0.3) * this.scale.width});
    this.number.attr({x: x * this.scale.width, y: y * this.scale.width});
};
