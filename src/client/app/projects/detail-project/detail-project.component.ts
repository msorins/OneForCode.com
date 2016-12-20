import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from '../project.interface';

@Component({
  moduleId: module.id,
  selector: 'ofc-detailProject',
  templateUrl: 'detail-project.component.html',
  styleUrls: ['detail-project.component.css']
})

export class DetailProjectComponent implements OnInit, OnDestroy{
  //@Input('post') post: string;
  projectName = ''
  projectObj: ProjectInterface;
  private sub: any;

  constructor(private _ActivatedRoute: ActivatedRoute, public _projectsService: ProjectsService) {}

  ngOnInit() {
    this.sub = this._ActivatedRoute.params.subscribe(
      params => {
        //Get the title from the page parameters
        this.projectName = params['title']

        //Get the current project by its title
        this._projectsService.getProjectByTitle(this.projectName).subscribe(
          data => this.projectObj = data
        )
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
