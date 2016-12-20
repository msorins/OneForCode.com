import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AddProjectComponent } from './add-project/index';
import { ProjectViewComponent } from './view-project/index';
import { MyProjectsComponent } from './my-projects/index';
import { DetailProjectComponent } from './detail-project/index';

@NgModule({
  imports: [ReactiveFormsModule, ProjectsRoutingModule, SharedModule],
  declarations: [AddProjectComponent, ProjectViewComponent, MyProjectsComponent, DetailProjectComponent],
  exports: [AddProjectComponent, ProjectViewComponent, MyProjectsComponent, DetailProjectComponent]
})

export class ProjectsModule { }
