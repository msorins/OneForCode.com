/**
 * Created by so on 19/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../auth/services/auth-service";
import {UsersService} from "../../api/users/users.service";
import {UserProfileInterface} from "../user-profile.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-timelineView',
  templateUrl: 'timeline-view.component.html',
  styleUrls: ['timeline-view.component.css']
})

export class TimelineViewComponent implements OnInit{

  ngOnInit() {

  }

}

