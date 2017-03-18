"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var materialize_directive_1 = require("./materialize-directive");
var MaterializeModule = (function () {
    function MaterializeModule() {
    }
    return MaterializeModule;
}());
MaterializeModule = __decorate([
    core_1.NgModule({
        declarations: [
            materialize_directive_1.MaterializeDirective
        ],
        imports: [
            common_1.CommonModule
        ],
        exports: [
            materialize_directive_1.MaterializeDirective
        ]
    })
], MaterializeModule);
exports.MaterializeModule = MaterializeModule;
//# sourceMappingURL=materialize-module.js.map