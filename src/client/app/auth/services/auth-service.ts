import {Injectable, Input} from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Http, Response } from '@angular/http';
import {Subscription} from "rxjs";
import {Observable} from "rxjs/RX";


@Injectable()
export class AuthService{
  public authState: FirebaseAuthState = null;
  public userGit: any;
  public userName: string  = "";
  public uid: string = "";

  constructor(public auth$: FirebaseAuth, private http: Http) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      console.log(state);

      if (this.isAuthenticated() && typeof state.github.uid !== "undefined") {
        console.log("--- GITHUB UID ---");
        this.getByGitUserID(this.authState.uid, this.authState.github.uid).subscribe(
          data => this.userGit = data
        );
      }

      else if (this.isAuthenticated() && typeof state.github.accessToken !== "undefined") {
        console.log("--- GITHUB TOKEN ---");
        this.getByGitToken(this.authState.uid, this.authState.github.accessToken).subscribe(
          data => this.userGit = data
        );
      }

    });
  }


  isAuthenticated(): boolean {
      return this.authState !== null;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  getGitUserName(): string {
    if(this.userGit == null)
      return '';

    return this.userGit.login;
  }

  getFirebaseUID(): string {
    if(this.authState.uid == null)
      return '';

    return this.authState.uid;
  }

  getUserName():string {
      if(this.authState == null || typeof this.userGit === "undefined")
        return '';

      return this.userGit.login;
      // return this.authState.auth.displayName;
  }

  getUserUID(): string {
    return this.authState.github.uid;
  }

  //WHEN PAGE IS REFRESH AND THERE EXISTS THE UID
  getByGitUserID(firebaseUID:string, gitUid: string): Observable<string[]> {
    //this.authState.github.uid
    return this.http.get('http://localhost:3000/api/users/get/gitUID?gitUID=' + gitUid + '&firebaseUID=' + firebaseUID)
      .map((res:Response) => res.json())
      .do(data => console.log('getByGitUserID:', data))  // debug

  }

  //WHEN USER JUST LOKEN AND THERE IS ONLY THE ACCESSTOKEN
  getByGitToken(firebaseUID: string, gitToken: string){
    //this.authState.github.accessToken
    return this.http.get('http://localhost:3000/api/users/get/gitToken?gitToken=' + gitToken + '&firebaseUID=' + firebaseUID)
      .map((res:Response) => res.json())
      .do(data => console.log('getByGitToken:', data))  // debug
  };

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({provider})
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signInAnonymously(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    })
      .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
  }

  signInWithGithub(): Promise<FirebaseAuthState> {
            return this.auth$.login({
            provider: AuthProviders.Github,
            method: AuthMethods.Redirect,
        });
   }
  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
  }

  signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Twitter);
  }

  signOut(): void {
    this.auth$.logout();
  }
}
