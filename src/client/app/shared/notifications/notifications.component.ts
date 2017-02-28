/**
 * Created by so on 27/02/2017.
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service'
import {NotificationsService} from "../../api/notifications/notifications.service";
import {NotificationsInterface} from "../../api/notifications/notifications.interface";

@Component({
  moduleId: module.id,
  styleUrls:['notifications.component.css'],
  selector: 'ofc-notifications',
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent implements OnInit{
  public notifications: NotificationsInterface[] = [];

  constructor(private _authService: AuthService, public _notificationService: NotificationsService) { }

  ngOnInit() {
    //When user is logged call the getNotifications function
    this._authService.loggedInEvent.subscribe(
      data => {
        this.getNotifications();
      }
    )
  }

  getNotifications() {
    //Subscribe to the notifications service
    this._notificationService.subscribeToNotifications().subscribe(
      data => {
        this.notifications = data;
      }
    )
  }

  numberOfNotifications():string {
    if(this.notifications.length == 1)
      return "1 notification";

    return this.notifications.length + " notifications";
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}
