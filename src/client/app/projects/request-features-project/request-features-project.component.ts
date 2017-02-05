/**
 * Created by so on 03/02/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReposService } from '../../api/repos/repos.service';
import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from '../project.interface'
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';
import {ActivatedRoute} from "@angular/router";
import {FeaturesProjectInterface} from "../features-project.interface";

@Component({
  moduleId: module.id,
  selector: 'ofc-request-feature',
  templateUrl: 'request-features-project.component.html',
  styleUrls: ['request-features-project.component.css']
})

export class RequestFeaturesProjectComponent implements OnInit{

  projectName: string = "";
  requestFeaturesForm: FormGroup;

  constructor(public _reposService: ReposService, public _projectsService: ProjectsService, public _authService: AuthService, private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit() {
    //Get Parameters

    this._ActivatedRoute.params.subscribe(
      params => {
        //Get the title from the page parameters
        this.projectName = params['title'];
      }
    );


    //Create the form
    this.requestFeaturesForm = new FormGroup({
      title: new FormControl('', [Validators.minLength(3)]),
      description: new FormControl(''),
      ch: new FormControl('')
    });
  }

  onSubmit({ value, valid }: { value: FeaturesProjectInterface, valid: boolean }) {
    if(valid === true) {

      value.status = "open";
      this._projectsService.addNewFeature(this._authService.getFirebaseUID(), this.projectName, value)
        .subscribe(
          data => {
            console.log(data);
          }
        )
    }
  }


}
