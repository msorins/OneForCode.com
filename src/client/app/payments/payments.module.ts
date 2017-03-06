/**
 * Created by so on 06/03/2017.
 */
import {NgModule, ModuleWithProviders} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from "../shared/shared.module";
import {PaymentsViewComponent} from "./payments-view/payments-view.component";


@NgModule({
  imports: [PaymentsRoutingModule, ReactiveFormsModule],
  declarations: [PaymentsViewComponent],
  exports: [PaymentsViewComponent]
})

export class PaymentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaymentsModule
    };
  }
}
