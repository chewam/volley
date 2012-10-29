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
        positions: JSON.parse(localStorage.getItem('teamA')),
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
        positions: JSON.parse(localStorage.getItem('teamB')),
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

    $('#positions').change(function() {
        var option = $('option:selected', $(this));

        teamB.loadPosition(option.val());
        showPositionDetails(teamB.positions.get(option.val()));
    });

    /**********/

    fillPositionsList(teamB.positions.items);

    /**********/

    for (key in Roles) {
        $('select.roles').append('<option value="'+key+'">'+Roles[key]+'</option>');
    }

    /**********/

    $('#save').click(function() {
        var name, number,
            values = $('#current-position').serializeArray(),
            positionName = $('#positions option:selected').val();

        position = teamB.positions.get(positionName);

        for (var i = 0, l = values.length; i < l; i++) {
            name = values[i].name;
            number = name.substr(name.length - 1);
            if (/role/.test(name)) {
                position.positions[number].role = values[i].value;
            } else if (/player/.test(name)) {
                position.positions[number].players = values[i].value.split(', ');
            } else if (/name/.test(name)) {
                position.name = values[i].value;
                $('#positions option:selected').text(values[i].value);
            }
        }

        teamB.loadPosition(positionName);

        console.log('POSITIONS', teamB.positions.items);
        savePositions(teamB.positions.items);
    });

    /**********/

    $('#create').click(function() {
        var fullName,
            positionName = $('#positions option:selected').val(),
            position = teamB.positions.get(positionName);

        positionName += '_' + (+new Date());
        fullName = 'Copy of ' + position.name;
        position = $.extend({}, position);
        position.name = fullName;
        teamB.positions.set(positionName, position);
        savePositions(teamB.positions.items);

        console.log('create', positionName, fullName, $('#options'));
        fillPositionsList(teamB.positions.items, positionName);
        teamB.loadPosition(positionName);
        showPositionDetails(positionName);
        // $('#options').append('<option value="'+positionName+'" selected="selected">'+fullName+'</option>');
        // $('#options').val(positionName);
        // teamB.loadPosition(positionName);
    });

});

var fillPositionsList = function(positions, selected) {
    var name, options = [];
    for (var key in positions) {
        name = positions[key].name;
        if (selected === key || (key === 'bench' && !selected)) {
            options.unshift('<option value="'+key+'" selected="selected">'+name+'</option>');
        } else {
            options.push('<option value="'+key+'">'+name+'</option>');
        }
    }
    $('#positions').empty();
    $('#positions').append(options);
};

var savePositions = function(positions) {
    if (JSON && localStorage) {
        localStorage.setItem('teamB', JSON.stringify(positions));
    } else {
        alert('This browser doesn\'t support local storage!');
    }
};

var showPositionDetails = function(position) {
    var player;

    $('#position-name').val(position.name);

    for (var key in position.positions) {
        player = '';
        if (position.positions[key].players) {
            player = position.positions[key].players.join(', ');
        }
        $('#player-at-' + key).val(player);

        if (position.positions[key].role) {
            $('#role-at-' + key).val(position.positions[key].role);
        }
    }
};
