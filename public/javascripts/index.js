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
        // $('#current-position form .form-actions a').toggleClass('disabled', option.val() === 'bench');
        if (option.val() !== 'bench') {
            $('#current-position').show();
        } else {
            $('#current-position').hide();
        }
    });

    /**********/

    $('#current-position form :checkbox').change(onCheckboxChange);

    /**********/

    fillPositionsList(teamB.positions.items);

    /**********/

    for (var key in Roles) {
        $('select.roles').append('<option value="'+key+'">'+Roles[key]+'</option>');
    }

    /**********/

    $('#export').click(function() {
        var positions = JSON.stringify(teamB.positions.items);

        $('#export-modal').modal('show');
        $('#export-modal pre.content').text(positions);
    });

    /**********/

    $('#save').click(function() {
        var name, number,
            values = $('#current-position form').serializeArray(),
            positionName = $('#positions option:selected').val(),
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
        savePositions(teamB.positions.items);
    });

    /**********/

    $('#delete').click(function() {
        var option = $('#positions option:selected'),
            positionName = option.val(),
            prevPositionName = option.prev().val(),
            position = teamB.positions.get(positionName);

        teamB.positions.remove(positionName);
        savePositions(teamB.positions.items);
        fillPositionsList(teamB.positions.items, prevPositionName);
        teamB.loadPosition(prevPositionName);
        showPositionDetails(teamB.positions.get(prevPositionName));
    });

    /**********/

    $('#create').click(function() {
        var fullName,
            positionName = $('#positions option:selected').val(),
            position = teamB.positions.get(positionName);

        positionName += '_' + (+new Date());
        fullName = 'Copy of ' + position.name;
        position = $.extend(true, {}, position);
        position.name = fullName;
        teamB.positions.set(positionName, position);
        savePositions(teamB.positions.items);
        fillPositionsList(teamB.positions.items, positionName);
        teamB.loadPosition(positionName);
        showPositionDetails(position);
        $('#current-position form .form-actions a').toggleClass('disabled', false);
    });

});

var onCheckboxChange = function() {
    console.log('change', this, arguments);
    var checkbox = $(this);
    if (checkbox.is(':checked')) {
        $('#current-position form :checkbox').each(function(index, item) {
            $(item).attr('checked', false);
            $(item).parent().next().hide();
        });
        checkbox.parent().next().show();
        checkbox.attr('checked', true);
    } else {
        checkbox.parent().next().hide();
    }
    
};

var fillPositionsList = function(positions, selected) {
    var name, options = [];
    for (var key in positions) {
        if (key === 'bench') continue;
        name = positions[key].name;
        if (selected === key) {
            options.push('<option value="'+key+'" selected="selected">'+name+'</option>');
        } else {
            options.push('<option value="'+key+'">'+name+'</option>');
        }
    }

    if (selected) {
        options.unshift('<option value="bench">Bench</option>');
    } else {
        options.unshift('<option value="bench" selected="selected">Bench</option>');
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
    var player, checkbox;

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

        if (position.positions[key].libero) {
            // console.log('LIBERO', key, position.positions[key].libero);
            checkbox = $($('#current-position form :checkbox')[key-1]);
            checkbox.attr('checked', true);
            checkbox.parent().next().val(position.positions[key].libero);
            onCheckboxChange.call($('#current-position form :checkbox')[key-1]);
        }
    }
};
