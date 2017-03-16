/**
 * Created by so on 15/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth-service'

import 'rxjs/add/operator/do';
import {UserProfileInterface} from "../../profile/user-profile.interface";  // for debugging


@Injectable()
export class UsersService {


  constructor(private http: Http, private _authService: AuthService) {}

  getUserProfile(username: string, firebaseUID?: string): Observable<UserProfileInterface> {
    let url: string;

    if(firebaseUID)
      url = 'http://localhost:3000/api/users/get/profile?username=' + username+'&firebaseUID=' + firebaseUID;
    else
      url = 'http://localhost:3000/api/users/get/profile?username=' + username;

    return this.http.get(url)
      .map((res: Response) => res.json())
      .do(data => console.log('getUserProfile:', data))  // debug
      .catch(this.handleError);
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
