/**
 * Created by so on 28/02/2017.
 */
import {Injectable, OnChanges} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {NotificationsInterface} from "./notifications.interface";  // for debugging

@Injectable()
export class NotificationsService  implements  OnChanges{


  constructor(private http: Http) {}


  ngOnChanges(changes: any) {
    console.log("Changes: " + changes);
  }

  sendNotification(firebaseUID: string, notificationObject: NotificationsInterface):  Observable<string[]> {
    let objJSON = JSON.stringify(notificationObject); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log(objJSON);

    return this.http.post('http://localhost:3000/api/notifications/new?firebaseUID=' + firebaseUID, objJSON, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .do(data => console.log('addNewFeatureProject:', data))

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
