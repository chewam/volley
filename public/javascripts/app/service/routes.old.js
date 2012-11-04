Vdt.service.Routes = function() {

    console.log('Vdt.service.Routes', this, arguments);

    return {
        toto: 42
    };

};

Vdt.app.service('routes', ['$route'], Vdt.service.Routes);
