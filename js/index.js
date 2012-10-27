window.onload = function() {

    var fieldConfig = {
        width: 18,
        height: 9,
        zoom: 55,
        margin: 20
    };

    var stage = new Kinetic.Stage({
        container: 'container',
        width: fieldConfig.width * fieldConfig.zoom + fieldConfig.margin * 2,
        height: fieldConfig.height * fieldConfig.zoom + fieldConfig.margin * 2
    });

    var layer = new Kinetic.Layer();

    var field = new Kinetic.Rect({
        x: fieldConfig.margin,
        y: fieldConfig.margin,
        width: fieldConfig.width * fieldConfig.zoom,
        height: fieldConfig.height * fieldConfig.zoom,
        fill: 'lightblue',
        stroke: 'black',
        strokeWidth: 4
    });

    var threeMetersLine = new Kinetic.Line({
        points: [
            (fieldConfig.width / 2 - 3) * fieldConfig.zoom, fieldConfig.margin,
            (fieldConfig.width / 2 - 3) * fieldConfig.zoom, fieldConfig.height * fieldConfig.zoom + fieldConfig.margin
        ],
        stroke: 'black',
        strokeWidth: 4
    });

    var threeMetersLine2 = new Kinetic.Line({
        points: [
            (fieldConfig.width - 3 * 2) * fieldConfig.zoom, fieldConfig.margin,
            (fieldConfig.width - 3 * 2) * fieldConfig.zoom, fieldConfig.height * fieldConfig.zoom + fieldConfig.margin
        ],
        stroke: 'black',
        strokeWidth: 4
    });

    var middleLine = new Kinetic.Line({
        points: [
            (fieldConfig.width / 2) * fieldConfig.zoom, 0,
            (fieldConfig.width / 2) * fieldConfig.zoom, fieldConfig.height * fieldConfig.zoom + fieldConfig.margin * 2
        ],
        dashArray: [20, 2, 4, 2],
        stroke: 'black',
        strokeWidth: 4
    });

    layer.add(field);
    layer.add(threeMetersLine);
    layer.add(threeMetersLine2);
    layer.add(middleLine);
    stage.add(layer);

};
