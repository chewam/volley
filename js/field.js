var Field = function(config) {

    $.extend(this, config || {});

    this.width *= this.zoom;
    this.height *= this.zoom;
    this.side *= this.zoom;
    this.margin *= this.zoom;

};

Field.prototype.getShape = function() {

    var group = new Kinetic.Group();

    var field = new Kinetic.Rect({
        x: this.margin,
        y: this.margin,
        width: this.width,
        height: this.height,
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var threeMetersLine = new Kinetic.Line({
        points: [
            (this.width / 2 + this.margin) - 3 * this.zoom, this.margin,
            (this.width / 2 + this.margin) - 3 * this.zoom, this.height + this.margin
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var threeMetersLine2 = new Kinetic.Line({
        points: [
            (this.width / 2 + this.margin) + 3 * this.zoom, this.margin,
            (this.width / 2 + this.margin) + 3 * this.zoom, this.height + this.margin
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var middleLine = new Kinetic.Line({
        points: [
            this.width / 2 + this.margin, this.margin - this.side,
            this.width / 2 + this.margin, this.margin + this.side + this.height
        ],
        // dashArray: [20, 2, 4, 2],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var sideLine = new Kinetic.Line({
        points: [
            this.margin, this.margin + this.height + this.side,
            (this.width / 2 + this.margin) - 3 * this.zoom, this.margin + this.height + this.side,
            (this.width / 2 + this.margin) - 3 * this.zoom, this.margin - this.side
        ],
        dashArray: [8, 6],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var sideLine2 = new Kinetic.Line({
        points: [
            this.margin + this.width, this.margin + this.height + this.side,
            (this.width / 2 + this.margin) + 3 * this.zoom, this.margin + this.height + this.side,
            (this.width / 2 + this.margin) + 3 * this.zoom, this.margin - this.side
        ],
        dashArray: [8, 6],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var tick = new Kinetic.Line({
        points: [
            this.margin - 0.2 * this.zoom, this.margin,
            this.margin - 0.4 * this.zoom, this.margin
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var tick2 = new Kinetic.Line({
        points: [
            this.margin - 0.2 * this.zoom, this.margin + this.height,
            this.margin - 0.4 * this.zoom, this.margin + this.height
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var tick3 = new Kinetic.Line({
        points: [
            this.width + this.margin + 0.2 * this.zoom, this.margin + this.height,
            this.width + this.margin + 0.4 * this.zoom, this.margin + this.height
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    var tick4 = new Kinetic.Line({
        points: [
            this.width + this.margin + 0.2 * this.zoom, this.margin,
            this.width + this.margin + 0.4 * this.zoom, this.margin
        ],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
    });

    group.add(field);
    group.add(tick);
    group.add(tick2);
    group.add(tick3);
    group.add(tick4);
    group.add(sideLine);
    group.add(sideLine2);
    group.add(threeMetersLine);
    group.add(threeMetersLine2);
    group.add(middleLine);

    return group;
};
