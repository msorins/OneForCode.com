import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from '../project.interface';
import { AuthService } from '../../auth/services/auth-service';
import {FeaturesProjectInterface} from "../features-project.interface";

@Component({
  moduleId: module.id,
  selector: 'ofc-detailProject',
  templateUrl: 'detail-project.component.html',
  styleUrls: ['detail-project.component.css']
})

export class DetailProjectComponent implements OnInit, OnDestroy{
  //@Input('post') post: string;
  projectTitle = '';
  projectObj: ProjectInterface = {title:"dd", gitUID:"", gitProject:"", tags:"", ch:"", description:"", features:[], byFirebaseUID: ""};
  projectContributionsObj: any;
  projectFeaturesObj: FeaturesProjectInterface[] = [];
  private sub: any;

  constructor(private _ActivatedRoute: ActivatedRoute, public _projectsService: ProjectsService, public _authService: AuthService) {}

  ngOnInit() {

    this.sub = this._ActivatedRoute.params.subscribe(
      params => {
        //Get the title from the page parameters
        this.projectTitle = params['title'];

        this.projectObj.title = this.projectTitle;
        this.initialiseProject()
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initialiseProject() {
    //Get the current project by its title
    this._projectsService.getProjectByTitle(this.projectTitle).subscribe(
      data => {
        this.projectObj = data;
        this.initialiseProjectContributions();
        this.initialiseProjectFeatures();
      }
    );
  }

  initialiseProjectContributions() {
    //Get pulls for the current project
    this._projectsService.getContributionsByTitle(this.projectObj.byFirebaseUID, this.projectObj.title).subscribe(
      data => this.projectContributionsObj = data
    )
  }


  initialiseProjectFeatures() {
    //Get the features for the current project
    this.projectFeaturesObj = [];

    this._projectsService.getFeaturesByTitle(this.projectObj.byFirebaseUID, this.projectObj.title).subscribe(
      data => {
        this.projectFeaturesObj = data;
      }
    )
  }

  handleSelectedContribution(inp: any) {
    if(inp["action"] == "accept") {
      this._projectsService.acceptContribution(this.projectObj.byFirebaseUID, this.projectTitle, inp["selectedContribution"]).subscribe(
        data => {
          this.projectContributionsObj = data;
          this.initialiseProjectFeatures();
        }
      );
    }

    if(inp["action"] == "deny") {
      this._projectsService.denyContribution(this.projectObj.byFirebaseUID, this.projectTitle, inp["selectedContribution"]).subscribe(
        data => {
          this.projectContributionsObj = data;
        }
      );
    }
  }
}
