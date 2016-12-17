import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReposService } from '../../api/repos/repos.service';
import { ProjectsService } from '../../api/projects/projects.service';
import { AddProject } from './add-project.interface'
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';

@Component({
  moduleId: module.id,
  selector: 'ofc-add-project',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.css']
})

export class AddProjectComponent implements OnInit{
    reposList :string[] ;
    addProjectForm: FormGroup;

    constructor(public _reposService: ReposService, public _projectsService: ProjectsService, public _authService: AuthService) {}

    ngOnInit() {
        //Get the list of repos
        this._reposService.getUserRepos()
          .subscribe(
            data => this.reposList = data
          );

        //Create the form
        this.addProjectForm = new FormGroup({
          title: new FormControl('', [Validators.minLength(3)]),
          gitProject: new FormControl(''),
          tags: new FormControl(''),
          description: new FormControl('')
        });
    }

    onSubmit({ value, valid }: { value: AddProject, valid: boolean }) {
      if(valid === true) {
        this._projectsService.addNewProject(this._authService.getFirebaseUID(), value)
          .subscribe(
            data => console.log(data)
          )
      }
    }

}
