/**
 * Created by so on 15/03/2017.
 */
import { Component } from '@angular/core';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';


@Component({
  moduleId: module.id,
  selector: 'ofc-chartsView',
  templateUrl: 'charts-view.component.html',
  styleUrls: ['charts-view.component.css']
})

export class ChartsViewComponent {
  public line_ChartData = [
    ['Month', 'Accepted contributions', 'Contributions'],
    ['Ian',  1,      0],
    ['Mar',  1,      1],
    ['Apr',  2,       1],
    ['May',  1,      1],
    ['June',  5,      3],
    ['July',  4,      2],
    ['Aug',  3,      1],
    ['Sept',  2,      2],
    ['Oct',  3,      3],
    ['Nov',  0,      0],
    ['Dec',  1,      1]];

  public line_ChartOptions = {
    curveType: 'function',
    colors: ['#2BBBAD', '#555'],
    legend: { position: 'bottom' },
    yAxis: { minValue: 0 }
  };

}
