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
require('rxjs/add/operator/do');
require('rxjs/add/operator/take');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth-service');
var UnauthGuard = (function () {
    function UnauthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    UnauthGuard.prototype.canActivate = function () {
        var _this = this;
        return this.auth.auth$
            .take(1)
            .map(function (authState) { return !authState; })
            .do(function (unauthenticated) {
            if (!unauthenticated) {
                _this.router.navigate(['/tasks']);
            }
        });
    };
    UnauthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], UnauthGuard);
    return UnauthGuard;
}());
exports.UnauthGuard = UnauthGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2d1YXJkcy91bmF1dGgtZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sc0JBQXNCLENBQUMsQ0FBQTtBQUM5QixRQUFPLHdCQUF3QixDQUFDLENBQUE7QUFFaEMscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLHVCQUFvQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXRELDZCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBSXZEO0lBQ0UscUJBQW9CLElBQWlCLEVBQVUsTUFBYztRQUF6QyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFakUsaUNBQVcsR0FBWDtRQUFBLGlCQVNDO1FBUkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSzthQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsR0FBRyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsQ0FBQyxTQUFTLEVBQVYsQ0FBVSxDQUFDO2FBQzVCLEVBQUUsQ0FBQyxVQUFBLGVBQWU7WUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWJIO1FBQUMsaUJBQVUsRUFBRTs7bUJBQUE7SUFjYixrQkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksbUJBQVcsY0FhdkIsQ0FBQSIsImZpbGUiOiJhcHAvYXV0aC9ndWFyZHMvdW5hdXRoLWd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3Rha2UnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVbmF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICBjYW5BY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoLmF1dGgkXG4gICAgICAudGFrZSgxKVxuICAgICAgLm1hcChhdXRoU3RhdGUgPT4gIWF1dGhTdGF0ZSlcbiAgICAgIC5kbyh1bmF1dGhlbnRpY2F0ZWQgPT4ge1xuICAgICAgICBpZiAoIXVuYXV0aGVudGljYXRlZCkge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Rhc2tzJ10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19
