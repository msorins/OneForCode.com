/**
 * Created by so on 03/02/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import { ProjectsService } from '../../api/projects/projects.service';

import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';
import { ProjectInterface } from '../project.interface';
import { ActivatedRoute } from "@angular/router";
import {runInNewContext} from "vm";
import {FeaturesProjectInterface} from "../features-project.interface";
import {ContributionInterface} from "../contribution.interface";

@Component({
  moduleId: module.id,
  selector: 'ofc-send-projects',
  templateUrl: 'send-contribution-project.component.html',
  styleUrls: ['send-contribution-project.component.css']
})

export class SendContributionProjectComponent implements OnInit{
  private sub: any;
  public projectName: string;
  public projectObj:ProjectInterface;
  public projectPullsObj: any;
  public projectFeaturesObj: FeaturesProjectInterface[];
  public sendContributionForm: FormGroup;
  public chosenFeature: string = '';
  public ok:any;

  constructor(public _authService: AuthService,  public _projectsService: ProjectsService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(
      params => {
        this.projectName = params['title'];
        this.chosenFeature = params['feature'];
        this.initialiseProject();
      }
    );

    //Initialise the form
    this.sendContributionForm = new FormGroup({
      featureTitle: new FormControl(this.chosenFeature),
      gitPullId: new FormControl(''),
      ch: new FormControl('')
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initialiseProject() {
    //Get the current project by its title
    this._projectsService.getProjectByTitle(this.projectName).subscribe(
      data => {
        this.projectObj = data;
        this.initialiseProjectPulls();
        this.initialiseProjectFeatures();
      }
    );
  }

  initialiseProjectPulls() {
    //Get pulls for the current project
    this._projectsService.getPulls(this.projectObj.gitUID, this.projectObj.gitProject).subscribe(
      data => this.projectPullsObj = this.filterPulls(data)
    )
  }

  filterPulls(inp: any) {
    let newObj: any = [];

    for(let i = 0; i < inp.length; i++) {
        console.log(inp[i]);
        if( inp[i].user.login == this._authService.getUserName() && inp[i].state == 'open') {
          newObj.push(inp[i]);
        }
    }

    return newObj;
  }

  initialiseProjectFeatures() {
    //Get the features for the current project
    this._projectsService.getFeaturesByTitle(this.projectObj.byFirebaseUID, this.projectObj.title).subscribe(
      data => {
        this.projectFeaturesObj = this.filterFeatures(data);
      }
    )
  }

  filterFeatures(inp: any) {
    let newObj: any = [];

    for(let i = 0; i < inp.length; i++) {

     if(this.chosenFeature == '' || this.chosenFeature == null || (this.chosenFeature != '' && inp[i].title == this.chosenFeature))
        newObj.push(inp[i]);

    }

    return newObj;
  }

  onSubmit({ value, valid }: { value: ContributionInterface, valid: boolean }) {
    if(valid === true) {
      value.byFirebaseUID = this._authService.getFirebaseUID();
      value.byUserName = this._authService.getUserName();
      value.status = "waiting";

      for(let item of this.projectPullsObj) {
        if(item.id == value.gitPullId) {
          value.gitHtmlUrl = item.html_url;
          value.gitApiUrl = item.url;
          value.gitTitle = item.title;
          break;
        }
      }

      console.log(value);

      this._projectsService.addNewContribution(this.projectObj.byFirebaseUID, this.projectObj.title, value)
        .subscribe(
          data => {
            console.log(data);
          }
        )


    }
  }



}
