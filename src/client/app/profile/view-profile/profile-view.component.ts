import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../auth/services/auth-service";


@Component({
  moduleId: module.id,
  selector: 'ofc-profileView',
  templateUrl: 'profile-view.component.html',
  styleUrls: ['profile-view.component.css']
})

export class ProfileViewComponent implements OnInit{
  public userName:string;
  public firebaseUID: string;

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.computeParams();
  }

  computeParams() {
    //Computes the params and chooses the userName accordingly
    this._activatedRoute.params.subscribe((params: Params) => {

      if(typeof(params['user']) == 'undefined') {
        this._authService.canGetUserName.subscribe(
          (data: string) => {
            this.userName = this._authService.getUserName();
            this.getUserData();
          }
        );
        this.userName = this._authService.getUserName();
      } else {
        this.userName = params['user'];
        this.getUserData();
      }

    });
  }

  getUserData() {

  }
}

