/**
 * Created by so on 06/03/2017.
 */
/**
 * Created by so on 28/02/2017.
 */
import {Injectable, OnChanges, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {NotificationsInterface} from "./notifications.interface";  // for debugging
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import {AuthService} from "../../auth/services/auth-service";

@Injectable()
export class PaymentsService  implements  OnChanges, OnInit{

  constructor(private http: Http,  public _fireBase: AngularFire, public _authService: AuthService) {}

  ngOnInit() {

  }

  test() {
    console.log("PAYMENT INITIALISED");
    console.log(JSON.stringify((<any>window).Stripe.customers));
    /*
    (<any>window).Stripe.setPublishableKey('pk_test_nHVpoaU1043erwC4BFqiUFGo');
    (<any>window).Stripe.customers.create({
      description: 'Customer for joseph.jackson@example.com',
      source: "tok_19ttypKMNeHyI7YCqTfO2iMJ" // obtained with Stripe.js
    }, (status: number, response: any) => {
      if (status === 200) {
        console.log(`Success! Card token ${response.card.id}.`);
      } else {
        console.log(response.error.message);
      }
    });
    */
  }
  ngOnChanges(changes: any) {
    console.log("Changes: " + changes);
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
