/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    app = express(),
    http = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io'),
    numCPUs = require('os').cpus().length,
    cluster = require('cluster');

// if (cluster.isMaster) {
//     // Fork workers. One per CPU for maximum effectiveness
//     for (var i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', function(deadWorker, code, signal) {
//         // Restart the worker
//         var worker = cluster.fork();

//         // Note the process IDs
//         var newPID = worker.process.pid;
//         var oldPID = deadWorker.process.pid;

//         // Log the event
//         console.log('worker ' + oldPID + ' died.');
//         console.log('worker ' + newPID + ' born.');
//     });
// }
// else {
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));


    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    app.get('/', routes.index);
    app.get('/particles', routes.particles);
    app.get('/sparks', routes.sparks);
    app.get('/users', user.list);


    http.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
// }
