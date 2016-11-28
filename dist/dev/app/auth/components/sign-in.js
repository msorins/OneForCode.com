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
            template: "\n    <div class=\"g-row sign-in\">\n      <div class=\"g-col\">\n        <h1 class=\"sign-in__heading\">Sign in</h1>\n        <button class=\"sign-in__button\" (click)=\"signInWithGithub()\" type=\"button\">GitHub</button>\n      </div>\n    </div>\n    {{auth.isAuthenticated()}}\n    {{auth.authState?.auth?.displayName}}\n  "
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2NvbXBvbmVudHMvc2lnbi1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLDZCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBcUJ2RDtJQUNFLHlCQUFvQixJQUFpQixFQUFVLE1BQWM7UUFBekMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRWpFLDJDQUFpQixHQUFqQjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTthQUMxQixJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQ0FBZ0IsR0FBaEI7UUFBQSxpQkFHQztRQUZDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7YUFDekIsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQWdCLEdBQWhCO1FBQUEsaUJBR0M7UUFGQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2FBQ3pCLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDJDQUFpQixHQUFqQjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTthQUMxQixJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxvQ0FBVSxHQUFsQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBM0NIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixNQUFNLEVBQUUsRUFFUDtZQUNELFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSwwVUFTVDtTQUNGLENBQUM7O3VCQUFBO0lBNEJGLHNCQUFDO0FBQUQsQ0ExQkEsQUEwQkMsSUFBQTtBQTFCWSx1QkFBZSxrQkEwQjNCLENBQUEiLCJmaWxlIjoiYXBwL2F1dGgvY29tcG9uZW50cy9zaWduLWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzdHlsZXM6IFtcblxuICBdLFxuICBzZWxlY3RvcjogJ29mYy1zaWduaW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJnLXJvdyBzaWduLWluXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZy1jb2xcIj5cbiAgICAgICAgPGgxIGNsYXNzPVwic2lnbi1pbl9faGVhZGluZ1wiPlNpZ24gaW48L2gxPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lnbi1pbl9fYnV0dG9uXCIgKGNsaWNrKT1cInNpZ25JbldpdGhHaXRodWIoKVwiIHR5cGU9XCJidXR0b25cIj5HaXRIdWI8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIHt7YXV0aC5pc0F1dGhlbnRpY2F0ZWQoKX19XG4gICAge3thdXRoLmF1dGhTdGF0ZT8uYXV0aD8uZGlzcGxheU5hbWV9fVxuICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbkluQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICBzaWduSW5Bbm9ueW1vdXNseSgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGguc2lnbkluQW5vbnltb3VzbHkoKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wb3N0U2lnbkluKCkpO1xuICB9XG5cbiAgc2lnbkluV2l0aEdpdGh1YigpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGguc2lnbkluV2l0aEdpdGh1YigpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBvc3RTaWduSW4oKSk7XG4gIH1cblxuICBzaWduSW5XaXRoR29vZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuYXV0aC5zaWduSW5XaXRoR29vZ2xlKClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucG9zdFNpZ25JbigpKTtcbiAgfVxuXG4gIHNpZ25JbldpdGhUd2l0dGVyKCk6IHZvaWQge1xuICAgIHRoaXMuYXV0aC5zaWduSW5XaXRoVHdpdHRlcigpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBvc3RTaWduSW4oKSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RTaWduSW4oKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICB9XG59XG4iXX0=
