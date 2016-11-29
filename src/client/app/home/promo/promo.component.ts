import { Component, OnInit  } from '@angular/core';
import { ProjectsService } from '../../api/projects/projects.service';

@Component({
  moduleId: module.id,
  selector: 'ofc-promo',
  templateUrl: 'promo.component.html',
  styleUrls: ['promo.component.css']
})

export class PromoComponent implements OnInit{
    posts: any[] = [];

    constructor(public projectsService: ProjectsService) {}

    ngOnInit() {
        this.projectsService.getOpenProjects()
          .subscribe(
            posts => this.posts = posts['data']
          );
    }

}
