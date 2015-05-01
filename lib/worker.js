var queue = jackrabbit('amqp://localhost');

queue.on('connected', function() {
    queue.create('jobs', { prefetch: 5 }, onReady);

    function onReady() {
        queue.handle('jobs', onJob);
    }

    function onJob(job, ack) {
        console.log('handling job ' + job.name);
        ack();
    }
});