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
      this._authService.loggedInEvent.subscribe(
        (data: any) => {

        }
      );
        //Get the list of repos
        if(this._authService.getUserName() == '') {
          this._authService.canGetUserName.subscribe(
            (data: any) => {
              this.getUserRepos();
            }
          );
        } else {
          this.getUserRepos();
        }

        //Create the form
        this.addProjectForm = new FormGroup({
          title: new FormControl('', [Validators.required, Validators.minLength(5)]),
          gitProject: new FormControl('', [Validators.required]),
          tags: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required])
        });
    }

    getUserRepos() {
      this._reposService.getUserRepos(this._authService.getUserName())
        .subscribe(
          data => this.reposList = data
        );
    }

    onSubmit({ value, valid }: { value: ProjectInterface, valid: boolean }) {
      if(valid === true) {
        value.gitUID = this._authService.getGitUserName();
        value.byFirebaseUID = this._authService.getFirebaseUID();
        value.byUserName = this._authService.getUserName();
        value.hasHeader = false;
        value.creationTimeStamp = new Date().getTime().toString();
        value.new = true;

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
