var Ground = function(config) {
    this.initConfig(config);
    this.draw();
};

Ground.prototype.initConfig = function(config) {
    this.initialConfig = config || {};

    for (var key in this.initialConfig) {
        this[key] = this.initialConfig[key];
    }
};

Ground.prototype.draw = function() {
    if (!this.paper) {
        this.paper = Raphael('ground', '100%', '100%');
    }

    this.paper.clear();
    this.drawField();
    this.drawTeam();
    this.initDrawing();
};

Ground.prototype.drawField = function() {
    var el = document.getElementById('ground');

    this.scale = {
        width: el.clientWidth / (this.width + this.margin * 2),
        height: el.clientHeight / (this.height + this.margin * 2)
    };

    this.field = this.paper.rect(
        this.margin,
        this.margin,
        this.width,
        this.height
    );
    this.field.attr({fill: '#FFFFFF'});
    this.field.transform('s'+this.scale.width+','+this.scale.width+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin) +
        ' '+(this.margin / 2) +
        'L'+(this.width / 2 + this.margin) +
        ' '+(this.height + this.margin + this.margin / 2)
    ).transform('s'+this.scale.width+','+this.scale.width+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin - 3) +
        ' '+(this.margin) +
        'L'+(this.width / 2 + this.margin - 3) +
        ' '+(this.height + this.margin)
    ).transform('s'+this.scale.width+','+this.scale.width+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin + 3) +
        ' '+(this.margin) +
        'L'+(this.width / 2 + this.margin + 3) +
        ' '+(this.height + this.margin)
    ).transform('s'+this.scale.width+','+this.scale.width+',0,0');
};

Ground.prototype.drawTeam = function() {
    this.team = new Team({
        width: this.width,
        scale: this.scale,
        paper: this.paper,
        margin: this.margin
    });
};

Ground.prototype.setPhase = function(phase) {
    this.team.setPositions(phase.positions);
};

Ground.prototype.initDrawing = function() {
    var me = this, pathArray, drawingBox;

    this.field.mousemove(function (evt) {
        var x, y,
            IE = document.all ? true : false;

        if (IE) {
            x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        } else {
            x = evt.pageX;
            y = evt.pageY;
        }
        // subtract paper coords on page
        this.ox = x - me.margin * me.scale.width - 25;
        this.oy = y - me.height * me.scale.width - 25;
    });

    var start = function () {
        pathArray = [];
    },
    move = function (dx, dy) {
        if (pathArray.length === 0) {
            pathArray[0] = ["M", this.ox, this.oy];
            drawingBox = me.paper.path(pathArray);
            drawingBox.attr({stroke: "#000000","stroke-width": 3});
        }
        else
            pathArray[pathArray.length] =["L", this.ox, this.oy];

        drawingBox.attr({path: pathArray});
    },
    up = function () {};

    this.field.drag(move, start, up);
};