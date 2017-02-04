/**
 * Created by so on 03/02/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import { ProjectsService } from '../../api/projects/projects.service';

import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';
import { ProjectInterface } from '../project.interface';
import { ActivatedRoute } from "@angular/router";
import {runInNewContext} from "vm";

@Component({
  moduleId: module.id,
  selector: 'ofc-send-projects',
  templateUrl: 'send-contribution-project.component.html',
  styleUrls: ['send-contribution-project.component.css']
})

export class SendContributionProjectComponent implements OnInit{
  private sub: any;
  public projectName: string;
  public projectObj:ProjectInterface;
  public projectPullsObj: any;

  constructor(public _authService: AuthService,  public _projectsService: ProjectsService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(
      params => {
        this.projectName = params['title'];
        this.initialiseProject();
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
      data => this.projectPullsObj = this.filterPulls(data)
    )
  }

  filterPulls(inp: any) {
    let newObj: any = [];

    for(let i = 0; i < inp.length; i++) {
        console.log(inp[i]);
        if( inp[i].user.login == this._authService.getUserName() && inp[i].state == 'open') {
          newObj.push(inp[i]);
        }
    }

    return newObj;
  }



}
