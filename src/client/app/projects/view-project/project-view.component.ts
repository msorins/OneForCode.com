import {Component, Input, ElementRef, ViewChild, NgZone, Inject, OnChanges, EventEmitter} from '@angular/core';
import { AuthService } from "../../auth/services/auth-service";
import { ProjectsService } from "../../api/projects/projects.service";
import { NgUploaderOptions } from "ngx-uploader/ngx-uploader";

@Component({
  moduleId: module.id,
  selector: 'ofc-projectView',
  templateUrl: 'project-view.component.html',
  styleUrls: ['project-view.component.css']
})

export class ProjectViewComponent implements  OnChanges{
  @Input('post') post: any;
  @Input('showDetailsButton') showDetailsButton: boolean;
  public editable:boolean = false;

  //Upload
  options: NgUploaderOptions;
  response: any;
  public imageHeaderName: string = '';
  inputUploadEvents: EventEmitter<string>;

  //Constructor
  constructor(public _authService: AuthService, public _projectsService: ProjectsService, private _elementRef: ElementRef, @Inject(NgZone) private zone: NgZone) { }

  ngOnChanges() {

      this.options = new NgUploaderOptions({
        url: 'http://localhost:3000/api/projects/upload/header',
        authToken: "IsItWorking?",
        data: {"byFirebaseUID" : this._authService.getFirebaseUID(), "fileName": this.post.title},
        fieldReset: true,
        autoUpload: false,
        filterExtensions: true,
        allowedExtensions: ['jpg', 'png']
      });

      this.inputUploadEvents = new EventEmitter<string>();
  }

  handleChosenImage(data: any) {
    //Get chosen file name
    this.imageHeaderName = data.target.files[0]["name"];
  }

  save() {
    // Save the edited Project to the DataBase
    if(this.imageHeaderName != '')
      this.post.hasHeader = true;

    this._projectsService.addNewProject(this._authService.getFirebaseUID(), this.post)
      .subscribe(
        data => {
          console.log(data);
        }
      );

    // Start the upload of the headerImage
    this.inputUploadEvents.emit('startUpload');

    //Reset chosen image
    this.imageHeaderName = ''
  }

  public image: any;

}
