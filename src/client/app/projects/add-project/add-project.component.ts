import { Component, OnInit } from '@angular/core';
import { ReposService } from '../../api/repos/repos.service';

@Component({
  moduleId: module.id,
  selector: 'ofc-add-project',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.css']
})

export class AddProjectComponent implements OnInit{
    reposList = [];
    constructor(public _reposService: ReposService) {}

    ngOnInit() {
        this._reposService.getUserRepos()
          .subscribe(
            data => this.reposList = data
          );
    }
}
