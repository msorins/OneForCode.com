/**
 * Created by so on 15/03/2017.
 */
import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth-service";


@Component({
  moduleId: module.id,
  selector: 'ofc-userDetails',
  templateUrl: 'user-details-view.component.html',
  styleUrls: ['user-details-view.component.css']
})

export class UserDetailsComponent {
  public editable:boolean = false;
  public post:any;

  constructor(private _authService: AuthService) {}


}
