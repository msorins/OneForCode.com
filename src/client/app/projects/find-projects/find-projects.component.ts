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

  projectsObj: ProjectInterface[];
  projectsObjFiltered: ProjectInterface[] = [];

  searchInput: string = '';
  selectedFilterOption: string = 'top';

  currentPage = 1;
  numberOfNotificationsPerPage = 30;

  ngOnInit() {
    this._projectsService.getAllProjects().subscribe(
      data => {
        this.projectsObj = this.sortProjectsTop(data);
        this.projectsObjFiltered = this.sortProjectsTop(data);
      }
    )
  }

  filterByName(title: string) {
    /*
      Receives a string and filter all the project by that substring
     */
    let res: ProjectInterface[] = [];

    for(let i in this.projectsObj) {
      if(this.projectsObj[i].title.toLocaleLowerCase().includes(title.toLowerCase()) == true)
        res.push(this.projectsObj[i]);
    }


    // Sort the result accordingly to the selected option
    if(this.selectedFilterOption == 'top')
       this.projectsObjFiltered = this.sortProjectsTop(res);

    if(this.selectedFilterOption == 'new')
      this.projectsObjFiltered = this.sortProjectsNew(res);
  }

  sortProjectsTop(obj: ProjectInterface[]) {
    return obj.sort(function(a, b) {
      let nrA = 0;
      let nrB = 0;

      if(typeof(a.features) != 'undefined')
        nrA += Object.keys(a.features).length;

      if(typeof(b.features) != 'undefined')
        nrB += Object.keys(b.features).length;


      if(typeof(a.features) != 'undefined' && typeof(a.features.questions) != 'undefined')
        nrA += Object.keys(a.features.questions).length;

      if(typeof(b.features) != 'undefined' && typeof(b.features.questions) != 'undefined')
        nrB += Object.keys(b.features.questions).length;

      if(typeof(a.contributions) != 'undefined')
        nrA += Object.keys(a.contributions).length;
      if(typeof(b.contributions) != 'undefined')
        nrB += Object.keys(b.contributions).length;


      if(nrA < nrB)
        return 1;
      else
        return 0;
    });
  }

  sortProjectsNew(obj: ProjectInterface[]) {
    return obj.sort(function(a, b) {
      if(b.creationTimeStamp == null)
        return 0;
      if(a.creationTimeStamp == null)
        return 1;

      if(a.creationTimeStamp > b.creationTimeStamp)
        return 1;
      else
        return 0;
    });
  }


  pagination(objList:any[], page:number, numberPerPage: number) {
    return objList.slice(numberPerPage * (page - 1), numberPerPage * page);
  }

  canLoadMorePages(objList:any[], page:number, numberPerPage: number) {
    if(numberPerPage* page < objList.length)
      return true;
    return false;
  }


}
