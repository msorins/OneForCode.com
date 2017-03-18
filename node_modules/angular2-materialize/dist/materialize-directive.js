"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var custom_event_polyfill_1 = require("./custom-event-polyfill");
var MaterializeDirective = (function () {
    function MaterializeDirective(_el) {
        this._el = _el;
        this._params = null;
        this._functionName = null;
        this.previousValue = null;
        this.previousDisabled = false;
        this._waitFunction = {};
        this.changeListenerShouldBeAdded = true;
        this.init = new core_1.EventEmitter();
        this.initialized = false;
    }
    Object.defineProperty(MaterializeDirective.prototype, "materializeParams", {
        set: function (params) {
            this._params = params;
            this.performElementUpdates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materializeActions", {
        set: function (actions) {
            var _this = this;
            actions.subscribe(function (action) {
                if (typeof action === "string") {
                    _this.performLocalElementUpdates(action);
                }
                else {
                    _this.performLocalElementUpdates(action.action, action.params);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materialize", {
        set: function (functionName) {
            this._functionName = functionName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materializeSelectOptions", {
        // this is here to trigger change detection for select elements
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    MaterializeDirective.prototype.ngAfterViewInit = function () {
        this.performElementUpdates();
    };
    MaterializeDirective.prototype.ngOnChanges = function (_unused) {
        var _this = this;
        if (this.isSelect()) {
            setTimeout(function () { return _this.performLocalElementUpdates(); }, 10);
        }
    };
    MaterializeDirective.prototype.ngOnDestroy = function () {
        this.performElementRemotion();
    };
    MaterializeDirective.prototype.ngDoCheck = function () {
        var nativeElement = this._el.nativeElement;
        var jQueryElement = $(nativeElement);
        if (this.isSelect()) {
            var shouldUpdate = false;
            if (nativeElement.disabled != this.previousDisabled) {
                this.previousDisabled = nativeElement.disabled;
                shouldUpdate = true;
            }
            if (!jQueryElement.attr("multiple") && nativeElement.value != this.previousValue) {
                // handle select changes of the model
                this.previousValue = nativeElement.value;
                shouldUpdate = true;
            }
            if (shouldUpdate) {
                this.performLocalElementUpdates();
            }
        }
        else if (this.isTextarea()) {
            if (nativeElement.value != this.previousValue) {
                this.previousValue = nativeElement.value;
                this.performElementUpdates();
            }
        }
        return false;
    };
    MaterializeDirective.prototype.performElementRemotion = function () {
        if (this.isTooltip()) {
            var nativeElement = this._el.nativeElement;
            var jQueryElement = $(nativeElement);
            var tooltipId = jQueryElement.attr('data-tooltip-id');
            if (tooltipId) {
                $('#' + tooltipId).remove();
            }
        }
    };
    MaterializeDirective.prototype.performElementUpdates = function () {
        var _this = this;
        // it should have been created by now, but confirm anyway
        if (Materialize && Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
        // handle select changes from the HTML
        if (this.isSelect() && this.changeListenerShouldBeAdded) {
            var nativeElement_1 = this._el.nativeElement;
            var jQueryElement = $(nativeElement_1);
            jQueryElement.on("change", function (e) {
                if (!e.originalEvent || !e.originalEvent.internalToMaterialize) {
                    var event_1 = document.createEvent("CustomEvent");
                    //if (jQueryElement.attr("multiple")) {
                    //event.initCustomEvent("input",false,false,undefined);
                    //}
                    //else {
                    event_1.initCustomEvent("change", false, false, undefined);
                    //}
                    event_1.internalToMaterialize = true;
                    nativeElement_1.dispatchEvent(event_1);
                }
            });
            this.changeListenerShouldBeAdded = false;
        }
        if (this.isAutocomplete()) {
            var nativeElement_2 = this._el.nativeElement;
            var jQueryElement = $(nativeElement_2);
            jQueryElement.on("change", function (e) { return nativeElement_2.dispatchEvent(custom_event_polyfill_1.CustomEvent("input")); });
        }
        if (this.isDatePicker()) {
            var nativeElement_3 = this._el.nativeElement;
            var jQueryElement_1 = $(nativeElement_3);
            var enablebtns = this.enableDPButtons;
            jQueryElement_1.on("change", function (e) { return nativeElement_3.dispatchEvent(custom_event_polyfill_1.CustomEvent("input")); });
            var datePicker = jQueryElement_1[this._functionName].apply(jQueryElement_1, this._params);
            var picker_1 = datePicker.pickadate('picker');
            jQueryElement_1.mousedown(function () {
                if (!jQueryElement_1.val()) {
                    return;
                }
                return picker_1.set.apply(picker_1, ['select', jQueryElement_1.val()].concat(_this._params));
            });
        }
        if (this.isTimePicker()) {
            var nativeElement_4 = this._el.nativeElement;
            var jQueryElement = $(nativeElement_4);
            jQueryElement.on("change", function (e) { return nativeElement_4.dispatchEvent(custom_event_polyfill_1.CustomEvent("input")); });
        }
        if (this.isChips()) {
            var nativeElement_5 = this._el.nativeElement;
            var jQueryElement = $(nativeElement_5);
            jQueryElement.on("chip.add", function (e, chip) { return nativeElement_5.dispatchEvent(custom_event_polyfill_1.CustomEvent("chip.add", chip)); });
            jQueryElement.on("chip.delete", function (e, chip) { return nativeElement_5.dispatchEvent(custom_event_polyfill_1.CustomEvent("chip.delete", chip)); });
            jQueryElement.on("chip.select", function (e, chip) { return nativeElement_5.dispatchEvent(custom_event_polyfill_1.CustomEvent("chip.select", chip)); });
        }
        if (this.isTextarea()) {
            this._el.nativeElement.dispatchEvent(custom_event_polyfill_1.CustomEvent("autoresize", { bubbles: true, cancelable: false, detail: undefined }));
        }
        this.performLocalElementUpdates();
    };
    MaterializeDirective.prototype.performLocalElementUpdates = function (functionName, params) {
        var _this = this;
        if (functionName === void 0) { functionName = this._functionName; }
        if (params === void 0) { params = this._params; }
        if (this._waitFunction[functionName]) {
            return;
        }
        this._waitFunction[functionName] = true;
        $(document).ready(function () {
            _this._waitFunction[functionName] = false;
            if (functionName) {
                var jQueryElement = $(_this._el.nativeElement);
                if (jQueryElement[functionName]) {
                    if (params) {
                        if (params instanceof Array) {
                            jQueryElement[functionName].apply(jQueryElement, params);
                        }
                        else {
                            throw new Error("Params has to be an array.");
                        }
                    }
                    else {
                        jQueryElement[functionName]();
                    }
                }
                else {
                    // fallback to running this function on the global Materialize object
                    if (Materialize[functionName]) {
                        if (params) {
                            if (params instanceof Array) {
                                Materialize[functionName].apply(Materialize, params);
                            }
                            else {
                                throw new Error("Params has to be an array.");
                            }
                        }
                        else {
                            Materialize[functionName]();
                        }
                    }
                    else {
                        throw new Error("Couldn't find materialize function ''" + functionName + "' on element or the global Materialize object.");
                    }
                }
                if (!_this.initialized) {
                    _this.initialized = true;
                    _this.init.emit();
                }
            }
        });
    };
    MaterializeDirective.prototype.isTooltip = function () {
        return (this._functionName && this._functionName === "tooltip");
    };
    MaterializeDirective.prototype.isSelect = function () {
        return (this._functionName && this._functionName === "material_select");
    };
    MaterializeDirective.prototype.isDatePicker = function () {
        return (this._functionName && this._functionName === "pickadate");
    };
    MaterializeDirective.prototype.isTimePicker = function () {
        return (this._functionName && this._functionName === "pickatime");
    };
    MaterializeDirective.prototype.isChips = function () {
        return (this._functionName && this._functionName === "material_chip");
    };
    MaterializeDirective.prototype.isAutocomplete = function () {
        return (this._functionName && this._functionName === "autocomplete");
    };
    MaterializeDirective.prototype.isTextarea = function () {
        return this._el.nativeElement.nodeName == "TEXTAREA";
    };
    MaterializeDirective.prototype.enableDPButtons = function () {
        $('.picker__clear').removeAttr("disabled");
        $('.picker__today').removeAttr("disabled");
        $('.picker__close').removeAttr("disabled");
        $('.picker__select--year').removeAttr("disabled");
        $('.picker__select--month').removeAttr("disabled");
    };
    return MaterializeDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MaterializeDirective.prototype, "init", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaterializeDirective.prototype, "materializeParams", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter),
    __metadata("design:paramtypes", [core_1.EventEmitter])
], MaterializeDirective.prototype, "materializeActions", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], MaterializeDirective.prototype, "materialize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaterializeDirective.prototype, "materializeSelectOptions", null);
MaterializeDirective = __decorate([
    core_1.Directive({
        selector: '[materialize]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], MaterializeDirective);
exports.MaterializeDirective = MaterializeDirective;
//# sourceMappingURL=materialize-directive.js.map