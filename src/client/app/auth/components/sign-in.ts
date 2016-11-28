import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';


@Component({
  moduleId: module.id,
  styles: [

  ],
  selector: 'ofc-signin',
  template: `
    <button *ngIf="auth.getUserName() == ''" class="sign-in__button" (click)="signInWithGithub()" type="button">GitHub Login</button>
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
