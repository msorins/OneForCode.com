import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileViewComponent } from "./view-profile/profile-view.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'profile', component: ProfileViewComponent },
      { path: 'profile/:user', component: ProfileViewComponent },
    ])
  ],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
