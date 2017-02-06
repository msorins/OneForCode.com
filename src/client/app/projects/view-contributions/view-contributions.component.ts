/**
 * Created by so on 05/02/2017.
 */
import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import { FeaturesProjectInterface } from "../features-project.interface";
import {ContributionInterface} from "../contribution.interface";
import {AuthService} from "../../auth/services/auth-service";
import {ProjectInterface} from "../project.interface";
import {ProjectsService} from "../../api/projects/projects.service";


@Component({
  moduleId: module.id,
  selector: 'ofc-contributionsView',
  templateUrl: 'view-contributions.component.html',
  styleUrls: ['view-contributions.component.css']
})

export class ContributionViewComponent implements OnInit, OnChanges {
  @Input('contributions') contributions: ContributionInterface[];
  @Output('selectedContribution') selectedContributionOut = new EventEmitter();


  private owner: boolean = false;

  private waitingContributions: ContributionInterface[] = [];
  private acceptedContributions: ContributionInterface[] = [];
  private deniedContributions: ContributionInterface[] = [];

  public selectedContribution: any;

  constructor(public _authService: AuthService, public _projectsService: ProjectsService) {}

  ngOnInit() {

  }

  ngOnChanges(changes: any) {

    if (this.contributions != null) {
      //Check to see if the view is rendered directly to the owner of the project (to give him permissions of editting)
      for (let crt of this.contributions) {
        if (crt.byFirebaseUID == this._authService.getFirebaseUID()) {
          this.owner = true;
          break;
        }
      }

      this.distributeContribution(this.contributions, this.waitingContributions, this.acceptedContributions, this.deniedContributions);
    }

  }

  distributeContribution(source: any, waitingContribution: ContributionInterface[], acceptedContribution: ContributionInterface[], deniedContribution: ContributionInterface[]) {
    //Split the list into 3 different categories: waiting, accepted denied
    waitingContribution.length = acceptedContribution.length = deniedContribution.length = 0;

    for (let crt of source) {
      if(crt.status == "waiting")
        waitingContribution.push(crt);

      if(crt.status == "accepted")
        acceptedContribution.push(crt);

      if(crt.status == "denied")
        deniedContribution.push(crt);
    }
  }

  submitAcceptContribution(selectedContribution: string) {
    let obj: any = {};
    obj["selectedContribution"] = selectedContribution;
    obj["action"] = "accept";

    this.selectedContributionOut.emit(obj);
  }

  submitDenyContribution(selectedContribution: string) {
    let obj: any = {};
    obj["selectedContribution"] = selectedContribution;
    obj["action"] = "deny";

    this.selectedContributionOut.emit(obj);
  }
}
