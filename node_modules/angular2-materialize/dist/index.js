"use strict";
var materialize_directive_1 = require("./materialize-directive");
exports.MaterializeDirective = materialize_directive_1.MaterializeDirective;
var materialize_module_1 = require("./materialize-module");
exports.MaterializeModule = materialize_module_1.MaterializeModule;
if (!("Materialize" in window)) {
    throw new Error("Couldn't find Materialize object on window. It is created by the materialize-css library. Please import materialize-css before importing angular2-materialize.");
}
if (!("Waves" in window)) {
    throw new Error("Couldn't find Waves object on window. It is supposed to be created by the materialize-css library. Please import materialize-css before importing angular2-materialize.");
}
Waves.displayEffect();
function toast() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    Materialize.toast.apply(Materialize, args);
}
exports.toast = toast;
//# sourceMappingURL=index.js.map