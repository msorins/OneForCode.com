/**
 * Created by so on 05/02/2017.
 */
import {Component, Input, OnInit, OnChanges} from '@angular/core';
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
  @Input('projectTitle') projectTitle: string;
  @Input('firebaseUID') firebaseUID: string;

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
          break
        }
      }

      //Split the list into 3 different categories: waiting, accepted denied
      for (let crt of this.contributions) {
          if(crt.status == "waiting")
            this.waitingContributions.push(crt);

          if(crt.status == "accepted")
            this.acceptedContributions.push(crt);

          if(crt.status == "denied")
            this.deniedContributions.push(crt);
      }
    }

  }

  submitAcceptContribution(selectedContribution: string) {
    this._projectsService.acceptContribution(this.firebaseUID, this.projectTitle, this.selectedContribution).subscribe(
      data => console.log(data)
    )
  }

  submitDenyContribution(selectedContribution: string) {
    this._projectsService.denyContribution(this.firebaseUID, this.projectTitle, this.selectedContribution).subscribe(
      data => console.log(data)
    )
  }
}
