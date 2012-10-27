var Player = function(config) {
    config = config || {};

    for (var key in config) {
        console.log('apply', key, config[key]);
        this[key] = config[key];
    }
};

Player.prototype.getShape = function() {

    var group = new Kinetic.Group({
        draggable: true
    });

    var line = new Kinetic.Line({
        points: [
            45, 45,
            20, 20,
            -5, 45
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var circle = new Kinetic.Circle({
        x: 20,
        y: 20,
        radius: 20,
        fill: 'red',
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var text = new Kinetic.Text({
        x: 12,
        y: 10,
        text: "6",
        fontSize: 20,
        textFill: "black"
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
