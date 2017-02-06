import { Component, Input } from '@angular/core';
import {AuthService} from "../../auth/services/auth-service";
import {ProjectsService} from "../../api/projects/projects.service";


@Component({
  moduleId: module.id,
  selector: 'ofc-projectView',
  templateUrl: 'project-view.component.html',
  styleUrls: ['project-view.component.css']
})

export class ProjectViewComponent {
      @Input('post') post: any;
      @Input('showDetailsButton') showDetailsButton: boolean;

      public editable:boolean = false;

      constructor(public _authService: AuthService, public _projectsService: ProjectsService) {}

      save() {
        // Save the edited Project to the DataBase

        this._projectsService.addNewProject(this._authService.getFirebaseUID(), this.post)
          .subscribe(
            data => {
              console.log(data);
            }
          )
      }
}
