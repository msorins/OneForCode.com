/**
 * Created by so on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {AuthService} from "../../auth/services/auth-service";
import {UserProfileInterface} from "../user-profile.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-userDetails',
  templateUrl: 'user-details-view.component.html',
  styleUrls: ['user-details-view.component.css']
})

export class UserDetailsComponent {
  @Input('userProfile') userProfile: UserProfileInterface;

  public editable:boolean = false;
  public post:any;

  constructor(private _authService: AuthService) {}


}
