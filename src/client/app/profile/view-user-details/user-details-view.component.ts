/**
 * Created by so on 15/03/2017.
 */
import {Component, Input} from '@angular/core';
import {AuthService} from "../../auth/services/auth-service";
import {UserProfileInterface} from "../user-profile.interface";
import {UsersService} from "../../api/users/users.service";


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

  constructor(private _authService: AuthService, private _userService: UsersService) {}


  save() {
    this._userService.saveUserProfile(this._authService.getFirebaseUID(), this.userProfile).subscribe(
      (data: UserProfileInterface) => {
        this.userProfile = data;
      }
    )
  }

}
