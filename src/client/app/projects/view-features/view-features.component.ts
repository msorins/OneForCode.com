import {Component, Input, OnChanges} from '@angular/core';
import { FeaturesProjectInterface } from "../features-project.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-featuresView',
  templateUrl: 'view-features.component.html',
  styleUrls: ['view-features.component.css']
})

export class FeatureViewComponent implements OnChanges{
  @Input('features') features: FeaturesProjectInterface[];
  @Input('projectTitle') projectTitle: string;

  openFeatures: FeaturesProjectInterface[] = [];
  completedFeatures: FeaturesProjectInterface[] = [];

  ngOnChanges() {
    if(this.features != null) {
      for(let crt of this.features) {
        if(crt.status == 'open')
          this.openFeatures.push(crt);
        if(crt.status == 'completed')
          this.completedFeatures.push(crt);
      }
    }
  }

}
