/**
 * Created by so on 23/02/2017.
 */
import {Component, Input, OnChanges, EventEmitter, Output} from '@angular/core';
import { FeaturesProjectInterface } from "../features-project.interface";
import { CKEditorModule } from 'ng2-ckeditor';
import {ProjectsService} from "../../api/projects/projects.service";
import {AuthService} from "../../auth/services/auth-service";

@Component({
  moduleId: module.id,
  selector: 'ofc-detail-feature',
  templateUrl: 'detail-feature.component.html',
  styleUrls: ['detail-feature.component.css']
})

export class DetailFeatureComponent{
  @Input('feature') feature: FeaturesProjectInterface;
  @Input('projectTitle') projectTitle: string;
  @Output('close') close =  new EventEmitter();

  ckeditorContent = "";

  constructor(public _projectsService: ProjectsService, public _authService: AuthService){
    this.ckeditorContent = `<p>My HTML</p>`;
  }

  editable = true;

  save() {
    //Save here feature object
    this._projectsService.setFeatureLargeDescription(this._authService.getFirebaseUID(), this.projectTitle, this.feature.title, this.ckeditorContent).subscribe(
      data => console.log(data)
    );


    //Emit close event
    this.close.emit(true);
  }

  onEditorChange(content: any) {
    this.ckeditorContent = content;
  }
}
