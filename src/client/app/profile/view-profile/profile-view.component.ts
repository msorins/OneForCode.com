import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../auth/services/auth-service";
import {UsersService} from "../../api/users/users.service";
import {UserProfileInterface} from "../user-profile.interface";
import {ActivitiesInterface} from "../activities.interface";
import {ActivitiesService} from "../../api/activities/activities.service";
import {AwardsInterface} from "../awards.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-profileView',
  templateUrl: 'profile-view.component.html',
  styleUrls: ['profile-view.component.css']
})

export class ProfileViewComponent implements OnInit{
  public userName:string;
  public firebaseUID: string;
  public userProfile: UserProfileInterface;
  public activitiesObj: ActivitiesInterface[];
  public awardsObj: AwardsInterface[];

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute, private _usersService: UsersService, private _activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.computeParams();
  }

  computeParams() {
    //Computes the params and chooses the userName accordingly
    console.log("Compute params called");
    this._activatedRoute.params.subscribe((params: Params) => {

      if(typeof(params['user']) == 'undefined') {
        if(this._authService.isAuthenticated()) {

          this.userName = this._authService.getUserName();
          this.getUserData(this.userName);

        } else {

          this._authService.canGetUserName.subscribe(
            (data: string) => {
              this.userName = this._authService.getUserName();
              this.getUserData(this.userName);
            }
          );

          this._authService.loggedInEvent.subscribe(
            (data: string) => {
              this.getUserActivities((this._authService.getFirebaseUID()));
              this.getUserAwards(this._authService.getFirebaseUID());
            }
          )

      }


      } else {
        this.userName = params['user'];
        this.getUserData(this.userName);
      }

    });
  }

  getUserData(name: string) {
    if(this._authService.getUserName() == name) {
      //Optimisation, also send firebaseUID if the users query's his profile
      this._usersService.getUserProfile(name, this._authService.getFirebaseUID()).subscribe(
        (data: UserProfileInterface) => {
          this.userProfile = data;
          this.getUserActivities(this.userProfile.firebaseUID);
          this.getUserAwards(this.userProfile.firebaseUID);
        }
      )
    } else {
      this._usersService.getUserProfile(name).subscribe(
        (data: UserProfileInterface) => {
          this.userProfile = data;
          this.getUserActivities(this.userProfile.firebaseUID);
          this.getUserAwards(this.userProfile.firebaseUID);

        }
      )
    }
  }

  getUserActivities(firebaseUID: string) {
    this._activitiesService.getUserActivties(firebaseUID).subscribe(
      data => {
        this.activitiesObj = data;
      }
    )
  }

  getUserAwards(firebaseUID: string) {
    this._usersService.getUserAwards(firebaseUID).subscribe(
      data => {
        this.awardsObj = data;
        console.log("AWARDS " + JSON.stringify(this.awardsObj));
      }
    )
  }
}

