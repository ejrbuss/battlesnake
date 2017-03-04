/**
 * NOTE: Don't worry about editing this file!
 * Where you want to focus is adding your AI to the endpoints in routes/index.js.
 */

const bodyParser = require('body-parser');
const express    = require('express');
const logger     = require('morgan');
const logger2    = require('./lib/logger');
const app        = express();
const routes     = require('./routes');

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001));

app.enable('verbose errors')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(routes);

app.use('*', (req, res, next) => {
    if (req.url === '/favicon.ico') {
        // Short-circuit favicon requests
        res.set({ 'Content-Type' : 'image/x-icon' });
        res.status(200);
        res.end();
        next();
    } else {
        // Reroute all 404 routes to the 404 handler
        let err = new Error();
        err.status = 404;
        next(err);
    }
});

// 404 handler middleware, respond with JSON only
app.use((err, req, res, next) => {
    if (err.status !== 404) {
        next(err);
    } else {
        logger2.log({ status : 404, url : req.url })
        res.status(404);
        res.send({
            status : 404,
            error  : err.message || "These are not the sneks you're looking for"
        });
    }
});

// 500 handler middleware, respond with JSON only
app.use((err, req, res, next) => {

    let statusCode = err.status || 500;

    res.status(statusCode);
    res.send({
        status : statusCode,
        error  : err
    })
});

let server = app.listen(app.get('port'), () =>
    console.log('Server listening on port %s', app.get('port'))
);