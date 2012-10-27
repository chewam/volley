$(function() {

    var zoom = 40;

    var layer = new Kinetic.Layer();

    /**********/

    var field = new Field({
        width: 18,
        height: 9,
        zoom: zoom,
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
        zoom: zoom,
        field: {
            width: 18,
            margin: 2.8
        },
        bench: {
            width: 6.1,
            height: 1.1,
            margin: 1,
            padding: 0.15,
            strokeWidth: 4,
            stroke: 'white',
            fill: '#DD985C',
            x: 2.8 - 1,
            y: 1 - 1.1 / 2
        },
        playerConfig: {
            radius: 0.4,
            fill: '#5cdd98',
            strokeWidth: 4,
            stroke: 'black',
            textFill: 'black'
        }
    });

    layer.add(teamA.getShape());

    var teamB = new Team({
        limit: 6,
        zoom: zoom,
        field: {
            width: 18,
            margin: 2.8
        },
        bench: {
            width: 6.1,
            height: 1.1,
            margin: 1,
            padding: 0.15,
            strokeWidth: 4,
            stroke: 'white',
            fill: '#DD985C',
            x: 2.8 + 18 - 6.1 + 1,
            y: 1 - 1.1 / 2
        },
        playerConfig: {
            radius: 0.4,
            fill: '#5c61dd',
            strokeWidth: 4,
            stroke: 'black',
            textFill: 'white'
        }
    });

    layer.add(teamB.getShape());

    /**********/

    var stage = new Kinetic.Stage({
        container: 'field',
        width: field.width + field.margin * 2,
        height: field.height + field.margin * 2
    });

    stage.add(layer);

    teamA.loadPosition('bench');
    teamB.loadPosition('bench');

    /**********/

    $('#position').change(function() {
        var option = $('option:selected', $(this));
        console.log('select', this, arguments, option.val());

        teamB.loadPosition(option.val());
    });

});
