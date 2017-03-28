/**
 * Created by so on 28/03/2017.
 */
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
import {ActivitiesInterface} from "../activities.interface";
import {AwardsInterface} from "../awards.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-awardsView',
  templateUrl: 'awards-view.component.html',
  styleUrls: ['awards-view.component.css']
})

export class AwardsViewComponent implements OnInit, OnChanges{
  @Input("awards") awardsList: AwardsInterface[];

  ngOnInit() {

  }

  ngOnChanges() {

  }


}
