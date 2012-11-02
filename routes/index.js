exports.index = function(req, res){
    res.render('index', {
        title: 'Volleyball tactical diagrams'
    });
};

exports.test = function(req, res){
    res.render('test', {
        layout: 'layout2',
        title: 'Volleyball tactical diagrams 2'
    });
};