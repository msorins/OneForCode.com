/**
 * Created by so on 06/02/2017.
 */
import {Component, Input} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'ofc-editNews',
  templateUrl: 'edit-news.component.html',
  styleUrls: ['edit-news.component.css']
})

export class EditNewsComponent {
  @Input('projectName') projectName: string;
}
