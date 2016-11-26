import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';


@Component({
  moduleId: module.id,
  styles: [

  ],
  selector: 'ofc-signin',
  template: `
    <div class="g-row sign-in">
      <div class="g-col">
        <h1 class="sign-in__heading">Sign in</h1>
        <button class="sign-in__button" (click)="signInWithGithub()" type="button">GitHub</button>
      </div>
    </div>
    {{auth.isAuthenticated()}}
    {{auth.authState?.auth?.displayName}}


    <div style="max-height:200px;" class="col s12 m7">
    <h2 class="header">Horizontal Card</h2>
    <div class="card horizontal">
      <div class="card-image">
        <img style="max-height:200px;" src="http://lorempixel.com/100/190/nature/6">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>

  `
})

export class SignInComponent {
  constructor(private auth: AuthService, private router: Router) {}

  signInAnonymously(): void {
    this.auth.signInAnonymously()
      .then(() => this.postSignIn());
  }

  signInWithGithub(): void {
    this.auth.signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  private postSignIn(): void {
    this.router.navigate(['/']);
  }
}
