import {NgModule, ModuleWithProviders} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ProfileViewComponent } from "./view-profile/profile-view.component";
import {PaymentsModule} from "../payments/payments.module";



@NgModule({
  imports: [ReactiveFormsModule, ProfileRoutingModule, SharedModule, PaymentsModule],
  declarations: [ProfileViewComponent],
  exports: [ProfileViewComponent]
})

export class ProfileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileModule
    };
  }
}
