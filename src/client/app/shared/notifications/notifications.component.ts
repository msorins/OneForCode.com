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

  currentPage = 1;
  numberOfNotificationsPerPage = 5;

  constructor(private _authService: AuthService, public _notificationService: NotificationsService) { }

  ngOnInit() {
    //When user is logged call the getNotifications function
    this._authService.canGetFirebaseAccessToken.subscribe(
      (data: any) => {
        this.getNotifications();
      }
    )
  }

  getNotifications() {
    //Subscribe to the notifications service
    this._notificationService.subscribeToNotifications().subscribe(
      data => {
        this.notifications = this.toArray(data);
        console.log("NOTIFICATIONS + " + JSON.stringify(data));
      }
    )
  }

  toArray(obj:any) {
    let res:NotificationsInterface[] = [];
    for(let key in obj) {
       if(key == "$key" || key == "$exists")
         continue;
       res.push(obj[key]);
    }

    return res;
  }

  numberOfNotifications():string {
    if(this.notifications.length == 1)
      return "1 notification";

    return this.notifications.length + " notifications";
  }

  deleteNotification(index: number) {
    index += this.numberOfNotificationsPerPage * (this.currentPage - 1);

    //Remove the local list
    this.notifications.splice(index, 1);

    //Send a request to the server in order to remove it also from database
    this._notificationService.deleteNotification(this._authService.getFirebaseUID(), this.notifications).subscribe(
      data => {
        //Done
      }
    )
  }

  pagination(objList:any[], page:number, numberPerPage: number) {
    return objList.slice(numberPerPage * (page - 1), numberPerPage * page);
  }

  canLoadMorePages(objList:any[], page:number, numberPerPage: number) {
    if(numberPerPage* page < objList.length)
      return true;
    return false;
  }
}
