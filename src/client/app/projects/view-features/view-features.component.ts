import { Component, Input } from '@angular/core';
import { FeaturesProjectInterface } from "../features-project.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-featuresView',
  templateUrl: 'view-features.component.html',
  styleUrls: ['view-features.component.css']
})

export class FeatureViewComponent {
  @Input('features') features: FeaturesProjectInterface;
  @Input('projectTitle') projectTitle: string;
}
