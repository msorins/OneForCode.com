/**
 * Created by so on 06/03/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GetChComponent} from "./get-ch/get-ch.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'get/ch', component: GetChComponent },
    ])
  ],
  exports: [RouterModule]
})

export class PaymentsRoutingModule { }
