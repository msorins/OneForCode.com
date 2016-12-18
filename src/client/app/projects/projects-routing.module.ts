import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddProjectComponent } from './add-project/index';
import { MyProjectsComponent } from './my-projects/my-projects.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add', component: AddProjectComponent },
      { path: 'projects', component: MyProjectsComponent}
    ])
  ],
  exports: [RouterModule]
})

export class ProjectsRoutingModule { }
