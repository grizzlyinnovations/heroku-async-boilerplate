var restify = require('restify'),
    queue = jackrabbit('amqp://localhost');

queue.on('connected', function () {
    queue.create('jobs', {prefetch: 5});
});

var server = restify.createServer();

server.get('/job/:name', function(req, res, next) {
    queue.publish('jobs', {name: req.params.name});
    next();
});

server.listen(process.env.PORT || 3000, function serverStarted() {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;