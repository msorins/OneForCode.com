import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddProjectComponent } from './add-project/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add', component: AddProjectComponent }
    ])
  ],
  exports: [RouterModule]
})

export class ProjectsRoutingModule { }
