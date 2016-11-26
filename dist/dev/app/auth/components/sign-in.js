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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth-service');
var SignInComponent = (function () {
    function SignInComponent(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    SignInComponent.prototype.signInAnonymously = function () {
        var _this = this;
        this.auth.signInAnonymously()
            .then(function () { return _this.postSignIn(); });
    };
    SignInComponent.prototype.signInWithGithub = function () {
        var _this = this;
        this.auth.signInWithGithub()
            .then(function () { return _this.postSignIn(); });
    };
    SignInComponent.prototype.signInWithGoogle = function () {
        var _this = this;
        this.auth.signInWithGoogle()
            .then(function () { return _this.postSignIn(); });
    };
    SignInComponent.prototype.signInWithTwitter = function () {
        var _this = this;
        this.auth.signInWithTwitter()
            .then(function () { return _this.postSignIn(); });
    };
    SignInComponent.prototype.postSignIn = function () {
        this.router.navigate(['/']);
    };
    SignInComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styles: [],
            selector: 'ofc-signin',
            template: "\n    <div class=\"g-row sign-in\">\n      <div class=\"g-col\">\n        <h1 class=\"sign-in__heading\">Sign in</h1>\n        <button class=\"sign-in__button\" (click)=\"signInWithGithub()\" type=\"button\">GitHub</button>\n      </div>\n    </div>\n    {{auth.isAuthenticated()}}\n    {{auth.authState?.auth?.displayName}}\n\n\n    <div style=\"max-height:200px;\" class=\"col s12 m7\">\n    <h2 class=\"header\">Horizontal Card</h2>\n    <div class=\"card horizontal\">\n      <div class=\"card-image\">\n        <img style=\"max-height:200px;\" src=\"http://lorempixel.com/100/190/nature/6\">\n      </div>\n      <div class=\"card-stacked\">\n        <div class=\"card-content\">\n          <p>I am a very simple card. I am good at containing small bits of information.</p>\n        </div>\n        <div class=\"card-action\">\n          <a href=\"#\">This is a link</a>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  "
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2NvbXBvbmVudHMvc2lnbi1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLDZCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBd0N2RDtJQUNFLHlCQUFvQixJQUFpQixFQUFVLE1BQWM7UUFBekMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRWpFLDJDQUFpQixHQUFqQjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTthQUMxQixJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQ0FBZ0IsR0FBaEI7UUFBQSxpQkFHQztRQUZDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7YUFDekIsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQWdCLEdBQWhCO1FBQUEsaUJBR0M7UUFGQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2FBQ3pCLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDJDQUFpQixHQUFqQjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTthQUMxQixJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxvQ0FBVSxHQUFsQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBOURIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixNQUFNLEVBQUUsRUFFUDtZQUNELFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSx1NkJBNEJUO1NBQ0YsQ0FBQzs7dUJBQUE7SUE0QkYsc0JBQUM7QUFBRCxDQTFCQSxBQTBCQyxJQUFBO0FBMUJZLHVCQUFlLGtCQTBCM0IsQ0FBQSIsImZpbGUiOiJhcHAvYXV0aC9jb21wb25lbnRzL3NpZ24taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGgtc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHN0eWxlczogW1xuXG4gIF0sXG4gIHNlbGVjdG9yOiAnb2ZjLXNpZ25pbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImctcm93IHNpZ24taW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnLWNvbFwiPlxuICAgICAgICA8aDEgY2xhc3M9XCJzaWduLWluX19oZWFkaW5nXCI+U2lnbiBpbjwvaDE+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWduLWluX19idXR0b25cIiAoY2xpY2spPVwic2lnbkluV2l0aEdpdGh1YigpXCIgdHlwZT1cImJ1dHRvblwiPkdpdEh1YjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAge3thdXRoLmlzQXV0aGVudGljYXRlZCgpfX1cbiAgICB7e2F1dGguYXV0aFN0YXRlPy5hdXRoPy5kaXNwbGF5TmFtZX19XG5cblxuICAgIDxkaXYgc3R5bGU9XCJtYXgtaGVpZ2h0OjIwMHB4O1wiIGNsYXNzPVwiY29sIHMxMiBtN1wiPlxuICAgIDxoMiBjbGFzcz1cImhlYWRlclwiPkhvcml6b250YWwgQ2FyZDwvaDI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQgaG9yaXpvbnRhbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cbiAgICAgICAgPGltZyBzdHlsZT1cIm1heC1oZWlnaHQ6MjAwcHg7XCIgc3JjPVwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzEwMC8xOTAvbmF0dXJlLzZcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtc3RhY2tlZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgPHA+SSBhbSBhIHZlcnkgc2ltcGxlIGNhcmQuIEkgYW0gZ29vZCBhdCBjb250YWluaW5nIHNtYWxsIGJpdHMgb2YgaW5mb3JtYXRpb24uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYWN0aW9uXCI+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5UaGlzIGlzIGEgbGluazwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ25JbkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgc2lnbkluQW5vbnltb3VzbHkoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoLnNpZ25JbkFub255bW91c2x5KClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucG9zdFNpZ25JbigpKTtcbiAgfVxuXG4gIHNpZ25JbldpdGhHaXRodWIoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoLnNpZ25JbldpdGhHaXRodWIoKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wb3N0U2lnbkluKCkpO1xuICB9XG5cbiAgc2lnbkluV2l0aEdvb2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGguc2lnbkluV2l0aEdvb2dsZSgpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBvc3RTaWduSW4oKSk7XG4gIH1cblxuICBzaWduSW5XaXRoVHdpdHRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGguc2lnbkluV2l0aFR3aXR0ZXIoKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wb3N0U2lnbkluKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0U2lnbkluKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgfVxufVxuIl19
