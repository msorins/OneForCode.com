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
var common_1 = require('@angular/common');
var home_component_1 = require('./home.component');
var home_routing_module_1 = require('./home-routing.module');
var shared_module_1 = require('../shared/shared.module');
var index_1 = require('../shared/name-list/index');
var index_2 = require('./header/index');
var index_3 = require('./promo/index');
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, home_routing_module_1.HomeRoutingModule, shared_module_1.SharedModule],
            declarations: [home_component_1.HomeComponent, index_2.HeaderComponent, index_3.PromoComponent],
            exports: [home_component_1.HomeComponent, index_2.HeaderComponent, index_3.PromoComponent],
            providers: [index_1.NameListService]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsK0JBQThCLGtCQUFrQixDQUFDLENBQUE7QUFDakQsb0NBQWtDLHVCQUF1QixDQUFDLENBQUE7QUFDMUQsOEJBQTZCLHlCQUF5QixDQUFDLENBQUE7QUFDdkQsc0JBQWdDLDJCQUEyQixDQUFDLENBQUE7QUFFNUQsc0JBQWdDLGdCQUFnQixDQUFDLENBQUE7QUFDakQsc0JBQStCLGVBQWUsQ0FBQyxDQUFBO0FBUS9DO0lBQUE7SUFBMEIsQ0FBQztJQU4zQjtRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLEVBQUUsdUNBQWlCLEVBQUUsNEJBQVksQ0FBQztZQUN4RCxZQUFZLEVBQUUsQ0FBQyw4QkFBYSxFQUFFLHVCQUFlLEVBQUUsc0JBQWMsQ0FBQztZQUM5RCxPQUFPLEVBQUUsQ0FBQyw4QkFBYSxFQUFFLHVCQUFlLEVBQUUsc0JBQWMsQ0FBQztZQUN6RCxTQUFTLEVBQUUsQ0FBQyx1QkFBZSxDQUFDO1NBQzdCLENBQUM7O2tCQUFBO0lBQ3dCLGlCQUFDO0FBQUQsQ0FBMUIsQUFBMkIsSUFBQTtBQUFkLGtCQUFVLGFBQUksQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9ob21lLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZVJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2hvbWUtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgTmFtZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL25hbWUtbGlzdC9pbmRleCc7XG5cbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2luZGV4JztcbmltcG9ydCB7IFByb21vQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9tby9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEhvbWVSb3V0aW5nTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtIb21lQ29tcG9uZW50LCBIZWFkZXJDb21wb25lbnQsIFByb21vQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0hvbWVDb21wb25lbnQsIEhlYWRlckNvbXBvbmVudCwgUHJvbW9Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtOYW1lTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVNb2R1bGUgeyB9XG4iXX0=
