import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../auth/services/auth-service";
import {UsersService} from "../../api/users/users.service";
import {UserProfileInterface} from "../user-profile.interface";


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

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute, private _usersService: UsersService) { }

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
        }
      )
    } else {
      this._usersService.getUserProfile(name).subscribe(
        (data: UserProfileInterface) => {
          this.userProfile = data;
        }
      )
    }

  }
}

