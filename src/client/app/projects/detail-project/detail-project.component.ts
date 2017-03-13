import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from '../project.interface';
import { AuthService } from '../../auth/services/auth-service';
import {FeaturesProjectInterface} from "../features-project.interface";
import {NewsInterface} from "../news.interface";
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import {PaymentsService} from "../../api/payments/payments.service";

@Component({
  moduleId: module.id,
  selector: 'ofc-detailProject',
  templateUrl: 'detail-project.component.html',
  styleUrls: ['detail-project.component.css']
})

export class DetailProjectComponent implements OnInit, OnDestroy{
  //@Input('post') post: string;
  projectTitle = '';
  projectObj: ProjectInterface = {title:"dd", gitUID:"", gitProject:"", tags:"", ch:"", description:"", features:[], byFirebaseUID: "", news: [], hasHeader: false, byUserName: ""};
  projectContributionsObj: any;
  projectFeaturesObj: FeaturesProjectInterface[] = [];
  private sub: any;
  public test:string = "Test title";
  public userFireBaseObservable: FirebaseObjectObservable<any>;

  constructor(private _ActivatedRoute: ActivatedRoute, public _projectsService: ProjectsService, public _authService: AuthService,  public _fireBase: AngularFire, private _paymentsService: PaymentsService) {}

  ngOnInit() {
    this.sub = this._ActivatedRoute.params.subscribe(
      params => {
        //Get the title from the page parameters
        this.projectTitle = params['title'];

        this.projectObj.title = this.projectTitle;

        //Load initial data if user is not logged in
        this.initialiseProject();
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initialiseProject() {
    //Currently unused ... now its based on FireBase listener
    //Get the current project by its title
    this._projectsService.getProjectByTitle(this.projectTitle).subscribe(
      data => {
        this.projectObj = data;

        //Enable real time listener
        this.initialiseProjectFirebaseListener();

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
        this.initialiseProjectFirebaseListener();
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

  newProjectHandle(obj:ProjectInterface) {
    this.projectObj = obj;
  }


  initialiseProjectFirebaseListener() {
    //If user is logged in enable realtime listener

    if(this._authService.isAuthenticated()) {

      this._projectsService.subscribeToProjects(this.projectObj.byFirebaseUID, this.projectTitle).subscribe(
        data => {
          this.projectObj = data;
          this.projectContributionsObj = this.toArray(data.contributions);
          this.projectFeaturesObj = this.toArray(data.features);
        }
      )

    } else {

      this._authService.loggedInEvent.subscribe(
        data => {
          this._projectsService.subscribeToProjects(this.projectObj.byFirebaseUID, this.projectTitle).subscribe(
            data => {
              this.projectObj = data;
              this.projectContributionsObj = this.toArray(data.contributions);
              this.projectFeaturesObj = this.toArray(data.features);
            }
          )
        }
      );

    }

  }



  toArray(obj: any) {
    //Get an dictionary
    //Returns an array / list from that dictionary
    let res:any = [];
    res = [];
    for(let key in obj) {
      res.push(obj[key]);
    }

    return res
  }

}
