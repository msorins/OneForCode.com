/**
 * Created by so on 06/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';

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
        this.message = `Success! Card token ${response.card.id}.`;
      } else {
        this.message = response.error.message;
      }
    });
  }

}
