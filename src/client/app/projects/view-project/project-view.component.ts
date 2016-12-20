import { Component, Input } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'ofc-projectView',
  templateUrl: 'project-view.component.html',
  styleUrls: ['project-view.component.css']
})

export class ProjectViewComponent {
      @Input('post') post: string;
      @Input('showDetailsButton') showDetailsButton: boolean;
}
