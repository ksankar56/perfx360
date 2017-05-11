'use strict';

module.exports = {
    printHello: printHello,
    createNewVar: createNewVar,
    rewriteUrl: rewriteUrl
};

function printHello(req, ctx, events, done) {
    console.log(' req url = ', req.url);
    console.log(' ctx uid = ', ctx._uid);
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