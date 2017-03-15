import { Component, OnInit  } from '@angular/core';
import { ProjectsService } from '../../api/projects/projects.service';
import { ProjectInterface } from "../../projects/project.interface";

@Component({
  moduleId: module.id,
  selector: 'ofc-promo',
  templateUrl: 'promo.component.html',
  styleUrls: ['promo.component.css']
})

export class PromoComponent implements OnInit{
    posts: ProjectInterface[] = [];

    constructor(public _projectsService: ProjectsService) {}

    ngOnInit() {
        this._projectsService.getTopProjects(6).subscribe(
          data => {
            this.posts = data;
            console.log("Receiveeed");
          }
        )
    }

}
