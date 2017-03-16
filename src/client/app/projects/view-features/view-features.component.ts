import {Component, Input, OnChanges, EventEmitter, Output} from '@angular/core';
import { FeaturesProjectInterface } from "../features-project.interface";
import {ProjectInterface} from "../project.interface";
import {QuestionsInterface} from "../questions.interface";
import {AuthService} from "../../auth/services/auth-service";


@Component({
  moduleId: module.id,
  selector: 'ofc-featuresView',
  templateUrl: 'view-features.component.html',
  styleUrls: ['view-features.component.css']
})

export class FeatureViewComponent implements OnChanges{
  @Input('project') project: ProjectInterface;
  @Input('update') update: any;

  @Output('newProject') newProject = new EventEmitter<ProjectInterface>();
  projectTitle: string;

  openFeatures: FeaturesProjectInterface[] = [];
  completedFeatures: FeaturesProjectInterface[] = [];

  isFeatureSelected = false;
  selectedFeature: FeaturesProjectInterface;

  constructor(private _authService: AuthService) {}
  ngOnChanges() {
    this.projectTitle = this.project.title;

    if(this.project["features"] != null) {
      this.openFeatures.length = this.completedFeatures.length = 0;

      for(let key in this.project["features"]) {
        if(this.project["features"][key].status == 'open')
          this.openFeatures.push(this.project["features"][key]);
        if(this.project["features"][key].status == 'completed')
          this.completedFeatures.push(this.project["features"][key]);
      }
    }
  }

  featureSelected(feature: FeaturesProjectInterface) {
    this.selectedFeature = feature;
    this.isFeatureSelected = true;
  }

  newProjectHandler(obj: ProjectInterface) {
    this.project = obj;
    this.newProject.emit(this.project);
  }

}
