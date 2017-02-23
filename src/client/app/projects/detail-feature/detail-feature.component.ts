/**
 * Created by so on 23/02/2017.
 */
import {Component, Input, OnChanges, EventEmitter, Output} from '@angular/core';
import { FeaturesProjectInterface } from "../features-project.interface";
import { CKEditorModule } from 'ng2-ckeditor';
import {ProjectsService} from "../../api/projects/projects.service";
import {AuthService} from "../../auth/services/auth-service";
import {ProjectInterface} from "../project.interface";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'ofc-detail-feature',
  templateUrl: 'detail-feature.component.html',
  styleUrls: ['detail-feature.component.css']
})

export class DetailFeatureComponent implements OnChanges{
  @Input('feature') feature: FeaturesProjectInterface;
  @Input('project') project: any; //Actuallt ProjectInterface type
  @Output('close') close =  new EventEmitter();
  @Output('newProject') newProject = new EventEmitter<ProjectInterface>();

  ckeditorContent = "";

  constructor(public _projectsService: ProjectsService, public _authService: AuthService, public _router: Router) { }

  ngOnChanges() {
    this.ckeditorContent = `` + this.feature.largeDescription;
  }

  editable = false;

  save() {
    //Save here feature object
    this._projectsService.setFeatureLargeDescription(this._authService.getFirebaseUID(), this.project.title, this.feature.title, this.ckeditorContent).subscribe(
      data => {
        this.project = data;
        this.newProject.emit(this.project);
        this.goBack();
      }
    );


  }

  onEditorChange(content: any) {
    this.ckeditorContent = content;
  }

  goBack() {
    //Emit close event
    this.close.emit(true);
  }
}
