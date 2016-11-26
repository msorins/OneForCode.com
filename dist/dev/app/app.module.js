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
            providers: [{
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLG1DQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXhELDZCQUFrQyxjQUFjLENBQUMsQ0FBQTtBQUVqRCxRQUFPLGlCQUFpQixDQUFDLENBQUE7QUFDekIsUUFBTyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlCLHFDQUFrQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXpELDZCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3RELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBRWhELElBQU0sbUJBQW1CLEdBQUc7SUFDdEIsTUFBTSxFQUFFLHlDQUF5QztJQUNqRCxVQUFVLEVBQUUsNEJBQTRCO0lBQ3hDLFdBQVcsRUFBRSxtQ0FBbUM7SUFDaEQsYUFBYSxFQUFFLHdCQUF3QjtJQUN2QyxpQkFBaUIsRUFBRSxjQUFjO0lBQ2pDLFFBQVEsRUFBRSxTQUFTO0lBQ25CLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztDQUNyQixDQUFDO0FBY0Y7SUFBQTtJQUF5QixDQUFDO0lBWjFCO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZ0NBQWEsRUFBRSxpQkFBVSxFQUFFLHFDQUFnQixFQUFFLDBCQUFXLEVBQUUsd0JBQVUsRUFBRSx3QkFBVSxFQUFFLDRCQUFZLENBQUMsT0FBTyxFQUFFO2dCQUNsSCxnQ0FBaUIsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBRSx3Q0FBaUI7YUFDdEU7WUFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxzQkFBYTtvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUIsQ0FBQztZQUNGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FFMUIsQ0FBQzs7aUJBQUE7SUFDdUIsZ0JBQUM7QUFBRCxDQUF6QixBQUEwQixJQUFBO0FBQWIsaUJBQVMsWUFBSSxDQUFBIiwiZmlsZSI6ImFwcC9hcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEFQUF9CQVNFX0hSRUYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2FwcC1yb3V0aW5nLm1vZHVsZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJGaXJlTW9kdWxlIH0gZnJvbSAnYW5ndWxhcmZpcmUyJztcblxuaW1wb3J0IFwibWF0ZXJpYWxpemUtY3NzXCI7XG5pbXBvcnQgXCJhbmd1bGFyMi1tYXRlcmlhbGl6ZVwiO1xuaW1wb3J0IHsgTWF0ZXJpYWxpemVNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tYXRlcmlhbGl6ZSc7XG5cbmltcG9ydCB7IEFib3V0TW9kdWxlIH0gZnJvbSAnLi9hYm91dC9hYm91dC5tb2R1bGUnO1xuaW1wb3J0IHsgSG9tZU1vZHVsZSB9IGZyb20gJy4vaG9tZS9ob21lLm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL2F1dGgvYXV0aC5tb2R1bGUnO1xuXG5jb25zdCBGSVJFQkFTRV9BUFBfQ09ORklHID0ge1xuICAgICAgYXBpS2V5OiBcIkFJemFTeUNIalFRRkNnaVFQeU1CTkMyelg3cF9tSndXZ1NiOFljZ1wiLFxuICAgICAgYXV0aERvbWFpbjogXCJvbmVmb3Jjb2RlLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9vbmVmb3Jjb2RlLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICBzdG9yYWdlQnVja2V0OiBcIm9uZWZvcmNvZGUuYXBwc3BvdC5jb21cIixcbiAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjQ4NjIxNzcxNTQ2N1wiLFxuICAgICAgcmVtZW1iZXI6ICdkZWZhdWx0JyxcbiAgICAgIHNjb3BlOiBbJ2VtYWlsJ11cbn07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCcm93c2VyTW9kdWxlLCBIdHRwTW9kdWxlLCBBcHBSb3V0aW5nTW9kdWxlLCBBYm91dE1vZHVsZSwgSG9tZU1vZHVsZSwgQXV0aE1vZHVsZSwgU2hhcmVkTW9kdWxlLmZvclJvb3QoKSxcbiAgQW5ndWxhckZpcmVNb2R1bGUuaW5pdGlhbGl6ZUFwcChGSVJFQkFTRV9BUFBfQ09ORklHKSwgTWF0ZXJpYWxpemVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IEFQUF9CQVNFX0hSRUYsXG4gICAgdXNlVmFsdWU6ICc8JT0gQVBQX0JBU0UgJT4nXG4gIH1dLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG5cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19
