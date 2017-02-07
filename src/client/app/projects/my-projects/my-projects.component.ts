import {Component, OnInit, OnChanges} from '@angular/core';
import { ProjectsService } from '../../api/projects/projects.service';

import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';
import { ProjectInterface } from '../project.interface';

@Component({
  moduleId: module.id,
  selector: 'ofc-my-projects',
  templateUrl: 'my-projects.component.html',
  styleUrls: ['my-projects.component.css']
})

export class MyProjectsComponent implements OnInit{
  public projectsList: ProjectInterface[] = [];

  constructor(public _projectsService: ProjectsService, public _authService: AuthService) {}

  ngOnInit() {
      this._authService.loggedInEvent.subscribe(
        data => {
          console.log("loggedInEvent triggered, firebaseUID: " + data);
          this.getProjectByUser();
        }
      );
      this.getProjectByUser();
  }

  transformToString(obj: ProjectInterface[]) {
    var res: ProjectInterface[] = [];
    for(var key in obj) {
      res.push(obj[key]);
    }
    return res;
  }

  getProjectByUser() {
    if(this._authService.getFirebaseUID().length) {
      console.log("DAAA : " + this._authService.getFirebaseUID());
      this._projectsService.getProjectsByUser(this._authService.getFirebaseUID()).subscribe(
        data => this.projectsList = this.transformToString(data),
      );
    }

  }
}
