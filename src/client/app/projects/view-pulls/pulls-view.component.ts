import { Component, Input } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'ofc-pullsView',
  templateUrl: 'pulls-view.component.html',
  styleUrls: ['pulls-view.component.css']
})

export class PullsViewComponent {
  @Input('pull') pull: any;
}
