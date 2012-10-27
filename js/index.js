window.onload = function() {

    var layer = new Kinetic.Layer();

    /**********/

    var field = new Field({
        width: 18,
        height: 9,
        zoom: 45,
        side: 1.75,
        margin: 2.2,
        strokeWidth: 4,
        stroke: 'white',
        fill: '#DD985C'
    });

    layer.add(field.getShape());

    /**********/
    
    var player = new Player({
        strokeWidth: 4,
        stroke: 'black'
    });

    layer.add(player.getShape());

    /**********/

    var stage = new Kinetic.Stage({
        container: 'container',
        width: field.width + field.margin * 2,
        height: field.height + field.margin * 2
    });

    stage.add(layer);

};
