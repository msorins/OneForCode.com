/**
 * Created by so on 06/03/2017.
 */
import {NgModule, ModuleWithProviders} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from "../shared/shared.module";
import {PaymentsViewComponent} from "./payments-view/payments-view.component";
import {GetChComponent} from "./get-ch/get-ch.component";


@NgModule({
  imports: [PaymentsRoutingModule, ReactiveFormsModule, SharedModule],
  declarations: [PaymentsViewComponent, GetChComponent],
  exports: [PaymentsViewComponent, GetChComponent]
})

export class PaymentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaymentsModule
    };
  }
}
