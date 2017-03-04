/**
 * Created by so on 02/03/2017.
 */
import {Component, OnInit, OnChanges} from '@angular/core';
import { ProjectsService } from '../../api/projects/projects.service';

import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';
import { ProjectInterface } from '../project.interface';

@Component({
  moduleId: module.id,
  selector: 'ofc-find-projects',
  templateUrl: 'find-projects.component.html',
  styleUrls: ['find-projects.component.css']
})

export class FindProjects implements OnInit{
  constructor(public _projectsService: ProjectsService, public _authService: AuthService) {}

  ngOnInit() {
  }

}
