var http = require('http'),
    app = require('./index');

http.createServer(app).listen(3000, function() {
    console.log("Express server listening on port " + 3000);
});
