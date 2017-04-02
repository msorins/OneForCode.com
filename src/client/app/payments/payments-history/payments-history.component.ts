/**
 * Created by so on 13/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';
import {PaymentsService} from "../../api/payments/payments.service";
import {AuthService} from "../../auth/services/auth-service";
import {TimeService} from "../../tools/time-difference/time.service";

@Component({
  moduleId: module.id,
  selector: 'ofc-paymentsHistory',
  templateUrl: 'payments-history.component.html',
  styleUrls: ['payments-history.component.css']

})

export class PaymentsHistoryComponent implements OnInit{
  public paymentsHistoryList:any = [];

  constructor(private _authService: AuthService, private _paymentsService: PaymentsService, private _timeDifference: TimeService) { }

  ngOnInit() {
    //If user is authentificated get the history directly
    if(this._authService.isAuthenticated())
      this.getHistoryOfPayments();
    else {
      //Else wait for logged in events
      this._authService.canGetFirebaseAccessToken.subscribe(
        (data: any) => {
          this.getHistoryOfPayments();
        }
      );
    }


  }

  getHistoryOfPayments() {
    this._paymentsService.getPaymentsByUser(this._authService.getFirebaseUID()).subscribe(
      data => {
        this.paymentsHistoryList = this.sortPaymentsByDate(data);
        console.log(JSON.stringify(this.paymentsHistoryList));
      }
    )
  }

  sortPaymentsByDate(obj: any[]) {
    if(!obj)
      return obj;
    else
      return obj.sort(function(a:any, b:any) {
        if(a.timestamp < b.timestamp)
          return 1;
        return 0;
      });
  }

}
