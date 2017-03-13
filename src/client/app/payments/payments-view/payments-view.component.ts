/**
 * Created by so on 06/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';
import {PaymentsService} from "../../api/payments/payments.service";
import {AuthService} from "../../auth/services/auth-service";

@Component({
  moduleId: module.id,
  selector: 'ofc-paymentsView',
  templateUrl: 'payments-view.component.html',
  styleUrls: ['payments-view.component.css']

})

export class PaymentsViewComponent implements OnInit{
  paymentForm: FormGroup;

  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  constructor(private _paymentsService: PaymentsService, private _authService: AuthService) {}

  paymentsOption: any = [ {ch: 1, price:4}, {ch: 2, price:7}, {ch: 5, price: 18}, {ch: 10, price: 33}, {ch: 50, price: 132 } ];
  paymentSum: number = 4;
  message: string;

  ngOnInit() {
    //Create the form
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl(''),
      expiryMonth: new FormControl(''),
      expiryYear: new FormControl(''),
      cvc: new FormControl('')
    });
  }

  getToken({ value, valid }: { value: any, valid: boolean }) {

    (<any>window).Stripe.card.createToken({
      number: value.cardNumber,
      exp_month: value.expiryMonth,
      exp_year: value.expiryYear,
      cvc: value.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.message = `Card verification Success! Card token ${response.card.id}.`;
        console.log(JSON.stringify(response));
        this._paymentsService.paymentsGetCh(this._authService.getFirebaseUID(), this._authService.getUserName(), response.id, this.paymentSum).subscribe(
          data => {
            console.log(data);
          }
        );
      } else {
        this.message = response.error.message;
      }
    });
  }

  onPaymentCompute(price: number) {
    this.paymentSum = price;
  }

}
