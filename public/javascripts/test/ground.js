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
    this.background = this.paper.rect(
        0,
        0,
        this.width + this.margin * 2,
        this.height + this.margin * 2
    );

    this.background.transform('s'+this.scale+','+this.scale+',0,0');

    this.background.attr({fill: 'transparent', stroke: 'none'});
};

Ground.prototype.drawField = function() {
    this.field = this.paper.rect(
        this.margin,
        this.margin,
        this.width,
        this.height
    );
    this.field.attr({fill: '#DD985C', stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1});
    this.field.transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin) +
        ' '+(this.margin / 2) +
        'L'+(this.width / 2 + this.margin) +
        ' '+(this.height + this.margin + this.margin / 2)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin - 3) +
        ' '+(this.margin / 2) +
        'L'+(this.width / 2 + this.margin - 3) +
        ' '+(this.height + this.margin * 1.5)
    ).
    transform('s'+this.scale+','+this.scale+',0,0').
    attr({'stroke-width': 0.2, 'stroke-dasharray': '.', 'stroke': '#FFFFFF', 'stroke-opacity': 1});

    this.paper.path(
        'M'+(this.margin) +
        ' '+(this.height + this.margin * 1.5) +
        'L'+(this.width / 2 + this.margin - 3) +
        ' '+(this.height + this.margin * 1.5)
    ).
    transform('s'+this.scale+','+this.scale+',0,0').
    attr({'stroke-width': 0.2, 'stroke-dasharray': '.', 'stroke': '#FFFFFF', 'stroke-opacity': 1});

    this.paper.path(
        'M'+(this.width / 2 + this.margin - 3) +
        ' '+(this.margin) +
        'L'+(this.width / 2 + this.margin - 3) +
        ' '+(this.height + this.margin)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.width / 2 + this.margin + 3) +
        ' '+(this.margin / 2) +
        'L'+(this.width / 2 + this.margin + 3) +
        ' '+(this.height + this.margin * 1.5)
    ).
    transform('s'+this.scale+','+this.scale+',0,0').
    attr({'stroke-width': 0.2, 'stroke-dasharray': '.', 'stroke': '#FFFFFF', 'stroke-opacity': 1});

    this.paper.path(
        'M'+(this.width / 2 + this.margin + 3) +
        ' '+(this.height + this.margin * 1.5) +
        'L'+(this.width + this.margin) +
        ' '+(this.height + this.margin * 1.5)
    ).
    transform('s'+this.scale+','+this.scale+',0,0').
    attr({'stroke-width': 0.2, 'stroke-dasharray': '.', 'stroke': '#FFFFFF', 'stroke-opacity': 1});

    this.paper.path(
        'M'+(this.width / 2 + this.margin + 3) +
        ' '+(this.margin) +
        'L'+(this.width / 2 + this.margin + 3) +
        ' '+(this.height + this.margin)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.margin - 0.3) +
        ' '+(this.margin) +
        'L'+(this.margin - 0.1) +
        ' '+(this.margin)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.margin - 0.3) +
        ' '+(this.margin + this.height) +
        'L'+(this.margin - 0.1) +
        ' '+(this.margin + this.height)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.margin + this.width + 0.1) +
        ' '+(this.margin) +
        'L'+(this.margin + this.width + 0.3) +
        ' '+(this.margin)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');

    this.paper.path(
        'M'+(this.margin + this.width + 0.1) +
        ' '+(this.margin + this.height) +
        'L'+(this.margin + this.width + 0.3) +
        ' '+(this.margin + this.height)
    ).
    attr({stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-opacity': 1}).
    transform('s'+this.scale+','+this.scale+',0,0');
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
    this.phase = phase;

    if (phase) {
        this.removeDrawings();
        this.addDrawings();
        this.team.setPositions(phase.positions, phase.libero);
    }
};

Ground.prototype.addDrawings = function() {
    if (this.phase && this.phase.drawings) {
        for (var i = 0, l = this.phase.drawings.length; i < l; i++) {
            this.drawings.push(
                this.paper.path(this.phase.drawings[i]).
                    attr({stroke: "#000000","stroke-width": 3})
            );
        }
    } else if (this.phase) {
        this.phase.drawings = [];
    }
};

Ground.prototype.removeDrawings = function() {
    if (this.drawings) {
        for (var i = 0, l = this.drawings.length; i < l; i++) {
            this.drawings[i].remove();
        }
        this.drawings.length = 0;
    }
};

Ground.prototype.initDrawing = function() {
    this.drawings = [];

    var me = this, pathArray, l, t, p, index,
        up = function () {
            eve('drawing');
        },
        start = function () { pathArray = []; },
        move = function (dx, dy) {
            if (me.phase && !me.phase.drawingEnabled) return;
            if (pathArray.length === 0) {
                if (!me.phase.drawings) {
                    me.phase.drawings = [];
                }
                pathArray[0] = ["M", this.ox, this.oy];
                p = me.paper.path(pathArray);
                p.attr({stroke: "#000000","stroke-width": 3});
                index = me.drawings.length;
                me.drawings.push(p);
            } else {
                pathArray[pathArray.length] = ["L", this.ox, this.oy];
            }
            p.attr({path: pathArray});
            if (me.phase) {
                me.phase.drawings[index] = pathArray;
            }
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
