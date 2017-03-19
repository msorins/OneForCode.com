/**
 * Created by so on 19/03/2017.
 */
/**
 * Created by so on 28/02/2017.
 */
import {Injectable, OnChanges} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {NotificationsInterface} from "./notifications.interface";  // for debugging
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import {AuthService} from "../../auth/services/auth-service";

@Injectable()
export class ActivitiesService  implements  OnChanges{


  constructor(private http: Http,  public _fireBase: AngularFire, public _authService: AuthService) {}


  ngOnChanges(changes: any) {

  }

  getUserActivties(firebaseUID: string):  Observable<NotificationsInterface[]> {
    let headers = new Headers({ 'Content-Type': 'application/json',
      'x-access-token' : this._authService.getFirebaseAccessToken()
    }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get('http://localhost:3000/api/activities/get?firebaseUID=' + firebaseUID,options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .do(data => console.log('getUserActivities:', data))
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
