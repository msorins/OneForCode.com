import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/services/auth-service'

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent{
     userName:string = '';


     constructor(public auth: AuthService){}


     ngOnInit() {
         this.userName = this.auth.getUserName()
     }
}
