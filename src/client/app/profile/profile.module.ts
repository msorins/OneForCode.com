import {NgModule, ModuleWithProviders} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ProfileViewComponent } from "./view-profile/profile-view.component";
import {PaymentsModule} from "../payments/payments.module";
import {UserDetailsComponent} from "./view-user-details/index";
import {ChartsViewComponent} from "./view-charts/charts-view.component";
import {GoogleChart} from 'google-chart';
import {TimelineViewComponent} from "./view-timeline/index";


@NgModule({
  imports: [ReactiveFormsModule, ProfileRoutingModule, SharedModule, PaymentsModule],
  declarations: [ProfileViewComponent, UserDetailsComponent, ChartsViewComponent, GoogleChart, TimelineViewComponent],
  exports: [ProfileViewComponent, UserDetailsComponent, ChartsViewComponent, TimelineViewComponent]
})

export class ProfileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileModule
    };
  }
}
