/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

module.exports = {
    setMessage: setMessage
};

const MESSAGES = [
    'what a nice day',
    'how\'s everybody?',
    'how\'s it going?',
    'what a lovely socket.io chatroom',
    'what is special today?',
    'Jeb, Jeb! wherefore are you from?',
    'now is the winter of our discontent.',
    'get thee to a nunnery',
    'a horse! a horse! my kingdom for a horse!'
];

function setMessage(context, events, done) {
    // pick a message randomly
    const index = Math.floor(Math.random() * MESSAGES.length);
    console.info('index = ', index);
    // make it available to templates as "message"
    context.vars.message = MESSAGES[index];
    return done();
}