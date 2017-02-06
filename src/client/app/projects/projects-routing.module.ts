import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddProjectComponent } from './add-project/index';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { DetailProjectComponent } from './detail-project/index';
import { SendContributionProjectComponent } from './send-contribution-project/index'
import { RequestFeaturesProjectComponent } from "./request-features-project/request-features-project.component";
import { ViewNewsComponent } from "./view-news/view-news.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add', component: AddProjectComponent },
      { path: 'projects', component: MyProjectsComponent},
      { path: 'project/:title', component: DetailProjectComponent},
      { path: 'send/:title/:feature', component: SendContributionProjectComponent },
      { path: 'send/:title', component: SendContributionProjectComponent },
      { path: 'request-features/:title', component: RequestFeaturesProjectComponent}
    ])
  ],
  exports: [RouterModule]
})

export class ProjectsRoutingModule { }
