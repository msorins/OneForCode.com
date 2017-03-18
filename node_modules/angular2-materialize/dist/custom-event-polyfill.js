"use strict";
function CustomEvent(type, detail, params) {
    if (detail === void 0) { detail = undefined; }
    if (params === void 0) { params = { bubbles: false, cancelable: false }; }
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, params.bubbles, params.cancelable, detail);
    return event;
}
exports.CustomEvent = CustomEvent;
if ("Event" in window) {
    CustomEvent.prototype = window.Event.prototype;
}
//# sourceMappingURL=custom-event-polyfill.js.map