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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_module_1 = require('./app-routing.module');
var angularfire2_1 = require('angularfire2');
require("materialize-css");
require("angular2-materialize");
var angular2_materialize_1 = require('angular2-materialize');
var about_module_1 = require('./about/about.module');
var home_module_1 = require('./home/home.module');
var shared_module_1 = require('./shared/shared.module');
var auth_module_1 = require('./auth/auth.module');
var FIREBASE_APP_CONFIG = {
    apiKey: "AIzaSyCHjQQFCgiQPyMBNC2zX7p_mJwWgSb8Ycg",
    authDomain: "oneforcode.firebaseapp.com",
    databaseURL: "https://oneforcode.firebaseio.com",
    storageBucket: "oneforcode.appspot.com",
    messagingSenderId: "486217715467",
    remember: 'default',
    scope: ['email']
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, about_module_1.AboutModule, home_module_1.HomeModule, auth_module_1.AuthModule, shared_module_1.SharedModule.forRoot(),
                angularfire2_1.AngularFireModule.initializeApp(FIREBASE_APP_CONFIG), angular2_materialize_1.MaterializeModule
            ],
            declarations: [app_component_1.AppComponent],
            providers: [auth_module_1.AuthModule,
                {
                    provide: common_1.APP_BASE_HREF,
                    useValue: '/'
                }],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLG1DQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXhELDZCQUFrQyxjQUFjLENBQUMsQ0FBQTtBQUVqRCxRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFDekIsUUFBTyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlCLHFDQUFrQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXpELDZCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3RELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBRWhELElBQU0sbUJBQW1CLEdBQUc7SUFDdEIsTUFBTSxFQUFFLHlDQUF5QztJQUNqRCxVQUFVLEVBQUUsNEJBQTRCO0lBQ3hDLFdBQVcsRUFBRSxtQ0FBbUM7SUFDaEQsYUFBYSxFQUFFLHdCQUF3QjtJQUN2QyxpQkFBaUIsRUFBRSxjQUFjO0lBQ2pDLFFBQVEsRUFBRSxTQUFTO0lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztDQUNyQixDQUFDO0FBZUY7SUFBQTtJQUF5QixDQUFDO0lBYjFCO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZ0NBQWEsRUFBRSxpQkFBVSxFQUFFLHFDQUFnQixFQUFFLDBCQUFXLEVBQUUsd0JBQVUsRUFBRSx3QkFBVSxFQUFFLDRCQUFZLENBQUMsT0FBTyxFQUFFO2dCQUNsSCxnQ0FBaUIsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBRSx3Q0FBaUI7YUFDdEU7WUFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDLHdCQUFVO2dCQUN0QjtvQkFDRSxPQUFPLEVBQUUsc0JBQWE7b0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCLENBQUM7WUFDRixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1NBRTFCLENBQUM7O2lCQUFBO0lBQ3VCLGdCQUFDO0FBQUQsQ0FBekIsQUFBMEIsSUFBQTtBQUFiLGlCQUFTLFlBQUksQ0FBQSIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBBUFBfQkFTRV9IUkVGIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hcHAtcm91dGluZy5tb2R1bGUnO1xuXG5pbXBvcnQgeyBBbmd1bGFyRmlyZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXJmaXJlMic7XG5cbmltcG9ydCBcIm1hdGVyaWFsaXplLWNzc1wiO1xuaW1wb3J0IFwiYW5ndWxhcjItbWF0ZXJpYWxpemVcIjtcbmltcG9ydCB7IE1hdGVyaWFsaXplTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItbWF0ZXJpYWxpemUnO1xuXG5pbXBvcnQgeyBBYm91dE1vZHVsZSB9IGZyb20gJy4vYWJvdXQvYWJvdXQubW9kdWxlJztcbmltcG9ydCB7IEhvbWVNb2R1bGUgfSBmcm9tICcuL2hvbWUvaG9tZS5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi9hdXRoL2F1dGgubW9kdWxlJztcblxuY29uc3QgRklSRUJBU0VfQVBQX0NPTkZJRyA9IHtcbiAgICAgIGFwaUtleTogXCJBSXphU3lDSGpRUUZDZ2lRUHlNQk5DMnpYN3BfbUp3V2dTYjhZY2dcIixcbiAgICAgIGF1dGhEb21haW46IFwib25lZm9yY29kZS5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vb25lZm9yY29kZS5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgc3RvcmFnZUJ1Y2tldDogXCJvbmVmb3Jjb2RlLmFwcHNwb3QuY29tXCIsXG4gICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI0ODYyMTc3MTU0NjdcIixcbiAgICAgIHJlbWVtYmVyOiAnZGVmYXVsdCcsXG4gICAgICBzY29wZTogWydlbWFpbCddXG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSwgSHR0cE1vZHVsZSwgQXBwUm91dGluZ01vZHVsZSwgQWJvdXRNb2R1bGUsIEhvbWVNb2R1bGUsIEF1dGhNb2R1bGUsIFNoYXJlZE1vZHVsZS5mb3JSb290KCksXG4gIEFuZ3VsYXJGaXJlTW9kdWxlLmluaXRpYWxpemVBcHAoRklSRUJBU0VfQVBQX0NPTkZJRyksIE1hdGVyaWFsaXplTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0F1dGhNb2R1bGUsXG4gIHtcbiAgICBwcm92aWRlOiBBUFBfQkFTRV9IUkVGLFxuICAgIHVzZVZhbHVlOiAnPCU9IEFQUF9CQVNFICU+J1xuICB9XSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxuXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==
