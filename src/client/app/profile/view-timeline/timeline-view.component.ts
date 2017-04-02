/**
 * Created by so on 19/03/2017.
 */
import {Component, OnInit, Input, OnChanges} from '@angular/core';
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

export class TimelineViewComponent implements OnInit, OnChanges{
  @Input("activities") activitiesObj: ActivitiesInterface[];
  activitiesObjSorted: ActivitiesInterface[];
  constructor(private _timeService: TimeService) {}

  ngOnInit() {

  }

  ngOnChanges() {
    this.activitiesObjSorted = this.sortActivitiesByDate(this.activitiesObj);
  }

  sortActivitiesByDate(obj: ActivitiesInterface[]) {
    if(obj == null)
        return null;
    else
      return obj.sort(function(a:ActivitiesInterface, b:ActivitiesInterface) {

        if(parseInt(a.timestamp) < parseInt(b.timestamp)) {
          console.log(a.timestamp + " (1) " + b.timestamp);
          return 1;
        } else {
          console.log(a.timestamp + " (0) " + b.timestamp);
          return 0;
        }


      });
  }

}
