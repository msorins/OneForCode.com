import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
//import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in';
import { AuthGuard } from './guards/auth-guard';
import { UnauthGuard } from './guards/unauth-guard';
import { AuthService } from './services/auth-service';


//const routes: Routes = [
//  {path: '', component: SignInComponent, canActivate: [UnauthGuard]}
//];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    UnauthGuard
  ],
  exports: [
      SignInComponent
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
