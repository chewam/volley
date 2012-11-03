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
    this.el = document.getElementById(this.renderTo);

    if (!this.paper) {
        this.paper = Raphael(this.renderTo, '100%', '100%');
    }

    this.scale = this.el.clientWidth / (this.width + this.margin * 2);

    this.el.style.height = ((this.height + this.margin * 2) * this.scale) + 'px';

    this.paper.clear();
    this.drawField();
    this.drawBackground();
    this.drawTeam();
    this.initDrawing();
};

Ground.prototype.drawBackground = function() {
    console.log('drawBackground', this.paper, this.paper.height);
    this.background = this.paper.rect(
        0,
        0,
        this.width + this.margin * 2,
        this.height + this.margin * 2
    );

    this.background.transform('s'+this.scale+','+this.scale+',0,0');

    this.background.attr({
        fill: 'transparent'
    });
};

Ground.prototype.drawField = function() {
    this.field = this.paper.rect(
        this.margin,
        this.margin,
        this.width,
        this.height
    );
    this.field.attr({fill: '#FFFFFF'});
    this.field.transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin) +
        ' '+(this.margin / 2) +
        'L'+(this.width / 2 + this.margin) +
        ' '+(this.height + this.margin + this.margin / 2)
    ).transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin - 3) +
        ' '+(this.margin) +
        'L'+(this.width / 2 + this.margin - 3) +
        ' '+(this.height + this.margin)
    ).transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin + 3) +
        ' '+(this.margin) +
        'L'+(this.width / 2 + this.margin + 3) +
        ' '+(this.height + this.margin)
    ).transform('s'+this.scale+','+this.scale+',0,0');
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
    if (phase) {
        this.team.setPositions(phase.positions, phase.libero);
    }
};

Ground.prototype.initDrawing = function() {
    var me = this, pathArray, drawingBox, l, t,
        up = function () {},
        start = function () { pathArray = []; },
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
        mousemove = function (evt) {
            var x, y,
                IE = document.all ? true : false;

            if (IE) {
                x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            } else {
                x = evt.pageX;
                y = evt.pageY;
            }

            l = me.el.offsetLeft;
            t = me.el.offsetTop;

            this.ox = x - l;
            this.oy = y - t;
        };

    this.background.mousemove(mousemove);
    this.background.drag(move, start, up);
};
