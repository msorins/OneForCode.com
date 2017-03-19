import {Injectable, Input, EventEmitter} from '@angular/core';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import { Http, Response } from '@angular/http';
import {Subscription} from "rxjs";
import {Observable} from "rxjs/RX";
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Injectable()
export class AuthService{
  public authState: FirebaseAuthState = null;
  public userGit: any;
  public userFireBaseObservable: FirebaseObjectObservable<any>;
  public userName: string  = "";
  public uid: string = "";
  public firebaseAccessToken:string = "";

  public loggedInEvent: EventEmitter<string> = new EventEmitter<string>();
  public canGetUserName: EventEmitter<string> = new EventEmitter<string>();
  public canGetFirebaseAccessToken: EventEmitter<string> = new EventEmitter<string>();

  constructor(public auth$: FirebaseAuth, private http: Http, public _fireBase: AngularFire) {

    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      console.log(state);
      this.loggedInEvent.emit(this.getFirebaseUID());
      this.renewFirebaseAccessToken();

      //SEND requests to the server with the firebaseAccessToken and GithubUID/GithubAcessToken
      //the servers calls GIT API and saves user data to firebaseDB and returns it
      if (this.isAuthenticated() && typeof state.github.uid !== "undefined") {
        console.log("--- GITHUB UID ---");
        this.getByGitUserID(this.authState.uid, this.authState.github.uid).subscribe(
          data => {
            this.userGit = data;
            this.canGetUserName.emit(this.getUserName());
          }
        );
      }

      else if (this.isAuthenticated() && typeof state.github.accessToken !== "undefined") {
        console.log("--- GITHUB TOKEN ---");
        this.getByGitToken(this.authState.uid, this.authState.github.accessToken).subscribe(
          data => {
            this.userGit = data;
            this.canGetUserName.emit(this.getUserName());
          }
        );
      }

      //Create an Observable to track changes in the FireBase DB
      if(this.authState != null) {
        this.userFireBaseObservable = _fireBase.database.object('/users/'+this.authState.uid);
        this.userFireBaseObservable.subscribe(
          data => this.userGit = data
        )
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

  getUserCh():number {
    if(this.userGit == null)
      return 0;

    return 0 + this.userGit.ch;
  }

  getGitUserName(): string {
    if(this.userGit == null)
      return '';

    return this.userGit.login;
  }

  getFirebaseUID(): string {
    if(this.authState == null || this.authState.uid == null)
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
      .do(data => console.log('getByGitUserID:', data)); // debug

  }

  //WHEN USER JUST LOKEN AND THERE IS ONLY THE ACCESSTOKEN
  getByGitToken(firebaseUID: string, gitToken: string){
    //this.authState.github.accessToken
    return this.http.get('http://localhost:3000/api/users/get/gitToken?gitToken=' + gitToken + '&firebaseUID=' + firebaseUID)
      .map((res:Response) => res.json())
      .do(data => console.log('getByGitToken:', data));  // debug
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

  signInWithGithub(): firebase.Promise<FirebaseAuthState> {
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

  // === FIREBASE ACCESS TOKEN SECTION ===
  renewFirebaseAccessToken() : any{
    //Returns through a callback the current firebaseAccessToken
    let auth = this._fireBase.auth.subscribe(
      data => {
        if(data == null) {

        } else {
          data.auth.getToken().then( data => this.saveFirebaseAccessToken(data));
        }
      }
    );
  }



  getFirebaseAccessToken():string {
    return this.firebaseAccessToken;
  }

  saveFirebaseAccessToken(token: string) {
    this.firebaseAccessToken = token;
    this.canGetFirebaseAccessToken.emit(token);
  }
}
