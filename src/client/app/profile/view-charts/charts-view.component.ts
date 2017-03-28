/**
 * Created by so on 15/03/2017.
 */
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
import {ActivitiesInterface} from "../activities.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-chartsView',
  templateUrl: 'charts-view.component.html',
  styleUrls: ['charts-view.component.css']
})

export class ChartsViewComponent implements OnInit, OnChanges{
  @Input('activities') activitiesList: ActivitiesInterface[];

  public line_ChartData:any[] = [];

  public months = ["Ian", "Feb", "Mar", "Apr", "May", "Iune", "Iuly", "Aug", "Sept", "Oct", "Nov", "Dec"];
  public crtMonth = -1;

  public line_ChartOptions = {
    curveType: 'function',
    colors: ['#2BBBAD', '#555'],
    legend: { position: 'bottom' },
    yAxis: { minValue: 0 }
  };

  ngOnInit() {
    this.crtMonth = new Date().getMonth();
    let nr = 0, crtMonth = this.crtMonth;
    console.log("CURRENT MONTH " + crtMonth);
    while(nr < 12) {
      this.line_ChartData.unshift([this.months[crtMonth], 0, 0]);

      crtMonth -= 1;
      if(crtMonth == -1)
        crtMonth = 11;
      nr++;
    }
    this.line_ChartData.splice(0, 0, ['Month', 'Accepted contributions', 'Contributions']);
  }

  ngOnChanges() {
    for(let key in this.activitiesList) {

      if(this.activitiesList[key].type == "Icontributed") {

        let monthIndex = new Date(parseInt(this.activitiesList[key].timestamp)).getMonth();
        let month = this.months[monthIndex];

        for(let i = 0; i < this.line_ChartData.length; i++) {
          if(this.line_ChartData[i][0] == month) {
            if(this.line_ChartData[i][1] == this.line_ChartData[i][2])
              this.line_ChartData[i][1] += 0.3;

            this.line_ChartData[i][1] += 1;
          }
        }
      }

      if(this.activitiesList[key].type  == "ICompletedFeature") {

        let monthIndex = new Date(parseInt(this.activitiesList[key].timestamp)).getMonth();
        let month = this.months[monthIndex];

        for(let i = 0; i < this.line_ChartData.length; i++) {
          if(this.line_ChartData[i][0] == month) {
            this.line_ChartData[i][2]++;
          }
        }

      }

    }
  }

}
