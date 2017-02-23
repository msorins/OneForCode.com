import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AddProjectComponent } from './add-project/index';
import { ProjectViewComponent } from './view-project/index';
import { MyProjectsComponent } from './my-projects/index';
import { DetailProjectComponent } from './detail-project/index';
import { PullsViewComponent } from './view-pulls/index';
import {SendContributionProjectComponent} from "./send-contribution-project/send-contribution-project.component";
import {FeaturesProjectInterface} from "./features-project.interface";
import {RequestFeaturesProjectComponent} from "./request-features-project/request-features-project.component";
import {FeatureViewComponent} from "./view-features/view-features.component";
import {ContributionViewComponent} from "./view-contributions/view-contributions.component";
import {ViewNewsComponent} from "./view-news/view-news.component";
import {FileSelectDirective, FileUploader} from "ng2-file-upload/ng2-file-upload";
import { NgUploaderModule } from 'ngx-uploader/ngx-uploader';
import { DetailFeatureComponent } from './detail-feature/index';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [CKEditorModule, ReactiveFormsModule, ProjectsRoutingModule, SharedModule,  NgUploaderModule],
  declarations: [AddProjectComponent, ProjectViewComponent, MyProjectsComponent, DetailProjectComponent, PullsViewComponent, SendContributionProjectComponent, RequestFeaturesProjectComponent, FeatureViewComponent, ContributionViewComponent, ViewNewsComponent, FileSelectDirective, DetailFeatureComponent],
  exports: [AddProjectComponent, ProjectViewComponent, MyProjectsComponent, DetailProjectComponent, PullsViewComponent, SendContributionProjectComponent, RequestFeaturesProjectComponent, FeatureViewComponent, ContributionViewComponent, ViewNewsComponent, DetailFeatureComponent]
})

export class ProjectsModule { }
