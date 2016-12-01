import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';

import "materialize-css";
import "angular2-materialize";
import { MaterializeModule } from 'angular2-materialize';

import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthService } from './auth/services/auth-service'


const FIREBASE_APP_CONFIG = {
      apiKey: "AIzaSyCHjQQFCgiQPyMBNC2zX7p_mJwWgSb8Ycg",
      authDomain: "oneforcode.firebaseapp.com",
      databaseURL: "https://oneforcode.firebaseio.com",
      storageBucket: "oneforcode.appspot.com",
      messagingSenderId: "486217715467",
      remember: 'default',
      scope: ['email']
};

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, AuthModule.forRoot(), ApiModule.forRoot(),ProjectsModule, AboutModule, HomeModule, SharedModule.forRoot(),
  AngularFireModule.initializeApp(FIREBASE_APP_CONFIG), MaterializeModule
  ],
  declarations: [AppComponent],
  providers: [
  AuthService,
  {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
