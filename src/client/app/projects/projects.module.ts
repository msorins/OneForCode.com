import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AddProjectComponent } from './addproject/index';

@NgModule({
  imports: [ProjectsRoutingModule, SharedModule],
  declarations: [AddProjectComponent],
  exports: [AddProjectComponent]
})
export class ProjectsModule { }
