window.onload = function() {

    var layer = new Kinetic.Layer();

    /**********/

    var field = new Field({
        width: 18,
        height: 9,
        zoom: 45,
        side: 1.75,
        margin: 2.8,
        strokeWidth: 4,
        stroke: 'white',
        fill: '#DD985C'
    });

    layer.add(field.getShape());

    /**********/
    
    var teamA = new Team({
        limit: 6,
        zoom: 45,
        field: {
            width: 18,
            margin: 2.8
        },
        bench: {
            width: 6.1,
            height: 1.1,
            margin: 1,
            strokeWidth: 4,
            stroke: '#AAA',
            fill: '#DDD',
            x: 2.8 - 1,
            y: 1 - 1.1 / 2
        },
        playerConfig: {
            fill: 'darkgreen',
            strokeWidth: 4,
            stroke: 'black',
            textFill: 'white'
        }
    });

    layer.add(teamA.getShape());

    var teamB = new Team({
        limit: 6,
        zoom: 45,
        field: {
            width: 18,
            margin: 2.8
        },
        bench: {
            width: 6.1,
            height: 1.1,
            margin: 1,
            strokeWidth: 4,
            stroke: '#AAA',
            fill: '#DDD',
            x: 2.8 + 18 - 6.1 + 1,
            y: 1 - 1.1 / 2
        },
        playerConfig: {
            fill: 'blue',
            strokeWidth: 4,
            stroke: 'black',
            textFill: 'white'
        }
    });

    layer.add(teamB.getShape());

    /**********/

    var stage = new Kinetic.Stage({
        container: 'container',
        width: field.width + field.margin * 2,
        height: field.height + field.margin * 2
    });

    stage.add(layer);

};
