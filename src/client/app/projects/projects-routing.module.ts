import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddProjectComponent } from './add-project/index';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { DetailProjectComponent } from './detail-project/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add', component: AddProjectComponent },
      { path: 'project/:title', component: DetailProjectComponent},
      { path: 'projects', component: MyProjectsComponent}
    ])
  ],
  exports: [RouterModule]
})

export class ProjectsRoutingModule { }
