import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth-service'

import 'rxjs/add/operator/do';  // for debugging


@Injectable()
export class ReposService {


  constructor(private http: Http, private _authService: AuthService) {}

  getUserRepos(): Observable<string[]> {

    return this.http.get('http://localhost:3000/api/repos?username=' + this._authService.getUserName())
                    .map((res: Response) => res.json())
                    .do(data => console.log('getUserRepos:', data))  // debug
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
