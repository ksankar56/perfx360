'use strict';

module.exports = {
    printHello: printHello,
    createNewVar: createNewVar,
    rewriteUrl: rewriteUrl
};

function printHello(req, ctx, events, done) {
    console.log(' req url = ', req.url);
    console.log(' ctx uid = ', ctx._uid);
    /*console.log(' req = ', req);
    console.log(' ctx = ', ctx);*/

    console.info('Date in processor = ', new Date());
    /*console.log('events = ', events);
    events.on('customStat', function (data) {
        console.info('customStat data = ', data);
    });

    events.on('started', function (data) {
        console.info('started data = ', data);
    });

    events.on('request', function (data) {
        console.info('request data = ', data);
    });

    events.on('response', function (data) {
        console.info('response data = ', data);
    });

    events.on('match', function (data) {
        console.info('match data = ', data);
    });

    events.on('error', function (data) {
        console.info('error data = ', data);
    });*/
    return done();
}

// Ref: https://github.com/shoreditch-ops/artillery/issues/184
// See hello.json - testing that scenario-level beforeRequest is handled
// correctly.
function doNothing(req, ctx, events, done) {
    return done();
}

// this function is called in a loop
function createNewVar(ctx, events, done) {
    ctx.vars.newVar = ctx.vars.$loopCount;
    console.log('createNewVar: ${ctx.vars.$loopCount}');
    return done();
}

function rewriteUrl(req, ctx, events, done) {
    req.url = '/';
    return done();
}