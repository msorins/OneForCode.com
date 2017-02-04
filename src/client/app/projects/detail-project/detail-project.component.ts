import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from '../project.interface';
import { AuthService } from '../../auth/services/auth-service';

@Component({
  moduleId: module.id,
  selector: 'ofc-detailProject',
  templateUrl: 'detail-project.component.html',
  styleUrls: ['detail-project.component.css']
})

export class DetailProjectComponent implements OnInit, OnDestroy{
  //@Input('post') post: string;
  projectName = ''
  projectObj: ProjectInterface = {title:"dd", gitUID:"", gitProject:"", tags:"", ch:"", description:"", features:[]};
  projectPullsObj: any;
  private sub: any;

  constructor(private _ActivatedRoute: ActivatedRoute, public _projectsService: ProjectsService, public _authService: AuthService) {}

  ngOnInit() {

    this.sub = this._ActivatedRoute.params.subscribe(
      params => {
        //Get the title from the page parameters
        this.projectName = params['title'];

        this.projectObj.title = this.projectName;
        this.initialiseProject()
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initialiseProject() {
    //Get the current project by its title
    this._projectsService.getProjectByTitle(this.projectName).subscribe(
      data => {
        this.projectObj = data;
        this.initialiseProjectPulls();
      }
    );
  }

  initialiseProjectPulls() {
    //Get pulls for the current project
    this._projectsService.getPulls(this.projectObj.gitUID, this.projectObj.gitProject).subscribe(
      data => this.projectPullsObj = data
    )
  }
}
