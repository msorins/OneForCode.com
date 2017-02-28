import {Component, OnInit, Input} from '@angular/core';
import { Validators } from '@angular/forms';
import { ReposService } from '../../api/repos/repos.service';
import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from '../project.interface'
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../auth/services/auth-service';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'ofc-add-project',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.css']
})

export class AddProjectComponent implements OnInit{
    @Input('header') header: string;
    reposList :string[] ;
    addProjectForm: FormGroup;

    constructor(public _reposService: ReposService, public _projectsService: ProjectsService, public _authService: AuthService, private _router: Router) {}

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
          description: new FormControl(''),
          ch: new FormControl('')
        });
    }

    onSubmit({ value, valid }: { value: ProjectInterface, valid: boolean }) {
      if(valid === true) {
        value.gitUID = this._authService.getGitUserName();
        value.byFirebaseUID = this._authService.getFirebaseUID();
        value.byUserName = this._authService.getUserName();
        value.hasHeader = false;

        this._projectsService.addNewProject(this._authService.getFirebaseUID(), value)
          .subscribe(
            data => {
                console.log(data);
                this.navigateToFeatureRequests(value.title);
            }
          )

      }
    }

    navigateToFeatureRequests(postTitle: string) {
      //Navigate to the step 2 of creating the project (another form for requests)
      console.log("NAVIGATEEE: " + postTitle);
      this._router.navigate(['/request-features', postTitle])
    }

}
