var Player = function(config) {
    $.extend(this, config || {});

    this.x *= this.zoom;
    this.y *= this.zoom;
    this.radius *= this.zoom;

};

Player.prototype.getShape = function() {

    this.group = new Kinetic.Group({
        draggable: true
    });

    var line = new Kinetic.Line({
        points: [
            this.x + this.radius * 2, this.y + this.radius * 2,
            this.x + this.radius, this.y + this.radius,
            this.x, this.y + this.radius * 2
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var circle = new Kinetic.Circle({
        x: this.x + this.radius,
        y: this.y + this.radius,
        radius: this.radius,
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var text = new Kinetic.Text({
        x: this.x - 7 + this.radius,
        y: this.y - 10 + this.radius,
        text: this.number,
        fontSize: 20,
        textFill: this.textFill
    });

    this.group.add(line);
    this.group.add(circle);
    this.group.add(text);

    this.group.on("mouseover", function() {
        document.body.style.cursor = "pointer";
    });

    this.group.on("mouseout", function() {
        document.body.style.cursor = "default";
    });

    this.group.on('keydown', function() {
        console.log('keydown', arguments);
    });

    return this.group;
};

Player.prototype.setPosition = function(position) {
    _group = this.group;
    console.log('setPosition', this.number, '-', position.x, position.y, '***', this.x, this.y, '***', position.x - this.x, position.y - this.y);

    this.group.transitionTo({
        x: position.x/* - this.x*/,
        y: position.y/* - this.y*/,
        easing: 'linear',
        duration: 1
    });

    this.x = position.x;
    this.y = position.y;
};