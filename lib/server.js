var restify = require('restify'),
    jackrabbit = require('jackrabbit');

console.log('connecting to rabbitMQ ' + process.env.RABBITMQ_BIGWIG_URL);
var queue = jackrabbit(process.env.RABBITMQ_BIGWIG_URL);

queue.on('connected', function () {
    console.log('connected to jackrabbit');
    queue.create('jobs', {prefetch: 5});
});

var server = restify.createServer();

server.get('/job/:name', function(req, res, next) {
    console.log('publishing job ' + req.params.name);
    queue.publish('jobs', {name: req.params.name});
    next();
});

server.listen(process.env.PORT || 3000, function serverStarted() {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;