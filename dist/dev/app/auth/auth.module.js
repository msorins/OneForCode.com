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
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var sign_in_1 = require('./components/sign-in');
var auth_guard_1 = require('./guards/auth-guard');
exports.AuthGuard = auth_guard_1.AuthGuard;
var unauth_guard_1 = require('./guards/unauth-guard');
exports.UnauthGuard = unauth_guard_1.UnauthGuard;
var auth_service_1 = require('./services/auth-service');
exports.AuthService = auth_service_1.AuthService;
var routes = [
    { path: '', component: sign_in_1.SignInComponent, canActivate: [unauth_guard_1.UnauthGuard] }
];
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [
                sign_in_1.SignInComponent
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes)
            ],
            providers: [
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService,
                unauth_guard_1.UnauthGuard
            ],
            exports: [
                sign_in_1.SignInComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2F1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUMvQyxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQXFDLGlCQUFpQixDQUFDLENBQUE7QUFFdkQsd0JBQWdDLHNCQUFzQixDQUFDLENBQUE7QUFDdkQsMkJBQTBCLHFCQUFxQixDQUFDLENBQUE7QUFrQ3ZDLGlCQUFTO0FBakNsQiw2QkFBNEIsdUJBQXVCLENBQUMsQ0FBQTtBQW1DM0MsbUJBQVc7QUFsQ3BCLDZCQUE0Qix5QkFBeUIsQ0FBQyxDQUFBO0FBaUM3QyxtQkFBVztBQTlCcEIsSUFBTSxNQUFNLEdBQVc7SUFDckIsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSx5QkFBZSxFQUFFLFdBQVcsRUFBRSxDQUFDLDBCQUFXLENBQUMsRUFBQztDQUNuRSxDQUFDO0FBd0JGO0lBQUE7SUFBeUIsQ0FBQztJQXJCMUI7UUFBQyxlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1oseUJBQWU7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AscUJBQVk7Z0JBQ1oscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQzlCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHNCQUFTO2dCQUNULDBCQUFXO2dCQUNYLDBCQUFXO2FBQ1o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wseUJBQWU7YUFDbEI7U0FJRixDQUFDOztrQkFBQTtJQUV1QixpQkFBQztBQUFELENBQXpCLEFBQTBCLElBQUE7QUFBYixrQkFBVSxhQUFHLENBQUE7QUFLSCIsImZpbGUiOiJhcHAvYXV0aC9hdXRoLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBTaWduSW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2lnbi1pbic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hdXRoLWd1YXJkJztcbmltcG9ydCB7IFVuYXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvdW5hdXRoLWd1YXJkJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuXG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICB7cGF0aDogJycsIGNvbXBvbmVudDogU2lnbkluQ29tcG9uZW50LCBjYW5BY3RpdmF0ZTogW1VuYXV0aEd1YXJkXX1cbl07XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2lnbkluQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQXV0aEd1YXJkLFxuICAgIEF1dGhTZXJ2aWNlLFxuICAgIFVuYXV0aEd1YXJkXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAgIFNpZ25JbkNvbXBvbmVudFxuICBdXG5cblxuXG59KVxuXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7fVxuXG5cbmV4cG9ydCB7IEF1dGhHdWFyZCB9O1xuZXhwb3J0IHsgQXV0aFNlcnZpY2UgfTtcbmV4cG9ydCB7IFVuYXV0aEd1YXJkIH07XG4iXX0=
