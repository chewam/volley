var Player = function(config) {
    $.extend(this, config || {});
};

Player.prototype.getShape = function() {

    var group = new Kinetic.Group({
        draggable: true
    });

    var line = new Kinetic.Line({
        points: [
            this.x + 25 + 25, this.y + 25 + 25,
            this.x + 25, this.y + 25,
            this.x - 25 + 25, this.y + 25 + 25
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var circle = new Kinetic.Circle({
        x: this.x + 25,
        y: this.y + 25,
        radius: 20,
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var text = new Kinetic.Text({
        x: this.x - 7 + 25,
        y: this.y - 10 + 25,
        text: this.number,
        fontSize: 20,
        textFill: this.textFill
    });

    group.add(line);
    group.add(circle);
    group.add(text);

    group.on("mouseover", function() {
        document.body.style.cursor = "pointer";
    });
    group.on("mouseout", function() {
        document.body.style.cursor = "default";
    });

    group.on('keydown', function() {
        console.log('keydown', arguments);
    });

    return group;
};
