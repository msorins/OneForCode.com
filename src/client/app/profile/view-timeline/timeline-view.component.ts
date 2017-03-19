/**
 * Created by so on 19/03/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../auth/services/auth-service";
import {UsersService} from "../../api/users/users.service";
import {UserProfileInterface} from "../user-profile.interface";
import {ActivitiesService} from "../../api/activities/activities.service";
import {ActivitiesInterface} from "../activities.interface";
import {TimeService} from "../../tools/time-difference/time.service";


@Component({
  moduleId: module.id,
  selector: 'ofc-timelineView',
  templateUrl: 'timeline-view.component.html',
  styleUrls: ['timeline-view.component.css']
})

export class TimelineViewComponent implements OnInit{
  @Input("activities") activitiesObj: ActivitiesInterface[];

  constructor(private _timeService: TimeService) {}

  ngOnInit() {

  }

}

