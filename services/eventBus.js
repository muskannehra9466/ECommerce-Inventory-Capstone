const EventEmitter = require('events');
// Central event bus keeps business events separate from route/controller code.
module.exports = new EventEmitter();
