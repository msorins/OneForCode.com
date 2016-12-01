import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AddProjectComponent } from './add-project/index';
import { ProjectViewComponent } from './view-project/index';

@NgModule({
  imports: [ProjectsRoutingModule, SharedModule],
  declarations: [AddProjectComponent, ProjectViewComponent],
  exports: [AddProjectComponent, ProjectViewComponent]
})
export class ProjectsModule { }
