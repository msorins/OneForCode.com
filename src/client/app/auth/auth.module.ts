import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
//import { Routes, RouterModule } from '@angular/router';

import { SignUiComponent } from './signui/sign-ui.component';
import { AuthGuard } from './guards/auth-guard';
import { UnauthGuard } from './guards/unauth-guard';
import { AuthService } from './services/auth-service';


//const routes: Routes = [
//  {path: '', component: SignInComponent, canActivate: [UnauthGuard]}
//];

@NgModule({
  declarations: [
    SignUiComponent
  ],
  imports: [
    CommonModule, AuthRoutingModule
  ],
  providers: [
    AuthGuard,
    UnauthGuard
  ],
  exports: [
      SignUiComponent
  ]
})

export class AuthModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: AuthModule,
        providers: [AuthService]
      };
    }
}
