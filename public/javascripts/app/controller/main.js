Vdt.controller.Main = function ($scope, $location, $phases, $ground) {

    $scope.create = function() {
        var phase,
            name = $scope.phases.newPhase;

        if (name && name.length) {
            phase = $phases.create(name);

            $location.path('/' + phase.id);
        }

        $scope.phases.newPhase = null;
    };

    $scope.remove = function() {
        $phases.remove($scope.phases.selected.id);
        $('#remove-modal').modal('hide');
        $scope.selectFirstPhase();
    };

    $scope.confirmRemove = function() {
        $('#remove-modal').modal('show');
    };

    $scope.selectFirstPhase = function() {
        var id = '';

        if ($scope.phases.items.length) {
            id = $scope.phases.items[0].id;
        }
        
        $location.path('/' + id);
    };

    $scope.onLiberoClick = function(index) {
        var phase = $scope.phases.selected;

        for (var key in phase.positions) {
            if (key != index && phase.positions[key].libero) {
                phase.positions[key].libero = false;
            }
        }
        $ground.setPhase(phase);
    };

    $scope.getToggleDetailsClass = function() {
        return $scope.detailsVisible ? 'active' : '';
    };

    $scope.toggleDetails = function() {
        $scope.detailsVisible = !$scope.detailsVisible;

        $('.details').collapse($scope.detailsVisible ? 'show' : 'hide');
    };

    $scope.getToggleDrawingClass = function() {
        return $ground.isDrawingEnabled() ? 'active' : '';
    };

    $scope.toggleDrawing = function() {
        $ground.toggleDrawing();
    };

    $scope.eraseDrawings = function() {
        $ground.removeDrawings();
        $phases.getSelected().drawings.length = 0;
    };

    $scope.onSave = function() {
        $scope.saving = true;
        $scope.$digest();
        setTimeout(function() {
            $scope.saving = false;
            $scope.$digest();
        }, 2000);
    };

    $scope.showPermalink = function() {
        var phase = angular.copy($scope.phases.selected),
            link = $location.protocol() +
            '://' + $location.host() +
            ($location.port() != 80 ? ':'+$location.port() : '') +
            '/#/' + phase.id + '/' + btoa(JSON.stringify(phase));

        // phase.name = 'Copy of ' + phase.name;
        // phase.id = btoa(phase.name + (+new Date()));
        // link += phase.id + '/' + JSON.stringify(phase);

        // link = 'http://volley.chewam.com/';

        $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
            format: 'json',
            apiKey: 'R_a81a7f598dff7efa0a0cf2c5cbe19681',
            login: 'goldledoigt',
            longUrl: link
        }, function(response) {
            if (response.status_text === 'OK') {
                link = response.data.url;
            }
            $('.modal-body a', $('#permalink-modal').modal('show'))
            .attr('href', link)
            .text(link);
        });
    };

    $scope.showImage = function() {
        var data,
            el = document.getElementById('canvas'),
            svg = document.getElementById('ground').innerHTML;

        canvg('canvas', svg);
        data = el.toDataURL('image/png');
        $('img', $('#modal').modal('show')).attr('src', data);
    };

    $scope.showDump = function() {
        var dump = JSON.stringify($scope.phases.items);

        $('textarea', $('#dump-modal').modal('show')).val(dump);
    };

    $scope.saveDump = function() {
        var items,
            dump = $('textarea', $('#dump-modal').modal('hide')).val();

        try {
            items = JSON.parse(dump);
        } catch(e) {}

        if (items) {
            $scope.phases.items = items;
        } else {
            console.error('cannot inject dump');
        }
    };

    $scope.saving = false;
    $scope.detailsVisible = false;
    $scope.phases = $phases.get();
    $phases.enableAutoSave($scope.onSave);
    $scope.roles = Vdt.model.Roles;
};

Vdt.controller.Main.$inject = ['$scope', '$location', 'phases', 'ground'];
