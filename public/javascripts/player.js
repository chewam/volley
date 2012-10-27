var Player = function(config) {
    $.extend(this, config || {});

    this.x *= this.zoom;
    this.y *= this.zoom;
    this.radius *= this.zoom;
};

Player.prototype.getShape = function() {

    this.group = new Kinetic.Group({
        draggable: true,
        visible: this.visible
    });

    // var line = new Kinetic.Line({
    //     points: [
    //         this.x + this.radius * 2, this.y + this.radius * 2,
    //         this.x + this.radius, this.y + this.radius,
    //         this.x, this.y + this.radius * 2
    //     ],
    //     stroke: this.stroke,
    //     strokeWidth: this.strokeWidth
    // });

    this.firstMove = new Kinetic.Line({
        visible: false,
        stroke: '#666',
        strokeWidth: this.strokeWidth,
        dashArray: [10, 5]
    });

    this.circle = new Kinetic.Circle({
        x: this.x + this.radius,
        y: this.y + this.radius,
        radius: this.radius,
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    this.number = new Kinetic.Text({
        x: this.x - 7 + this.radius,
        y: this.y - 10 + this.radius,
        text: this.number,
        fontSize: 20,
        textFill: this.textFill
    });

    this.role = new Kinetic.Text({
        x: this.x - 15,
        y: this.y - 15,
        fontSize: 10,
        textFill: 'black'
    });

    this.group.add(this.firstMove);
    // this.group.add(line);
    this.group.add(this.circle);
    this.group.add(this.role);
    this.group.add(this.number);

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

Player.prototype.setPosition = function(position, bench) {

    this.group.transitionTo({
        x: position.libero ? bench.x : position.x,
        y: position.libero ? bench.y : position.y,
        easing: 'linear',
        duration: 1
    });

    this.x = position.x;
    this.y = position.y;

    if (position.firstMove) {
        this.firstMove.setPoints([
            this.radius, this.radius,
            position.firstMove.x - position.x, position.firstMove.y - position.y
        ]);
        this.firstMove.show();
    } else {
        this.firstMove.hide();
    }

    if (position.role === 'setter') {
        this.circle.setFill('black');
    // } else if (position.libero) {
    //     this.circle.setFill('darkred');
    } else {
        this.circle.setFill(this.fill);
    }

    this.role.setText((position.role || '') + (position.players ? ' - ' + (/*position.libero || */position.players.join(', ')) : ''));
};
