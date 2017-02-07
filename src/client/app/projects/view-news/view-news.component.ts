/**
 * Created by so on 06/02/2017.
 */
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {NewsInterface} from "../news.interface";
import {ProjectsService} from "../../api/projects/projects.service";
import {AuthService} from "../../auth/services/auth-service";


@Component({
  moduleId: module.id,
  selector: 'ofc-newsView',
  templateUrl: 'view-news.component.html',
  styleUrls: ['view-news.component.css']
})

export class ViewNewsComponent implements OnInit, OnChanges{
  @Input('title') title: any;

  public test: string;

  public editable:boolean = false;
  public newsList: any[] = []; // Actually NewsInterface[]

  constructor(public _authService: AuthService, public _projectsService: ProjectsService) {}

  ngOnInit() {
    this.load();
  }

  ngOnChanges() {
    this.load();
  }

  load() {

    if(this._authService.getFirebaseUID() != null) {
      this._projectsService.getNews(this._authService.getFirebaseUID(), this.title)
        .subscribe(
          data=> {
            console.log(data);
            this.newsList = data;
          }
        )
    }

  }

  save() {
    this._projectsService.addNews(this._authService.getFirebaseUID(), this.title, this.newsList)
      .subscribe(
        data=> {
          console.log(data);
          this.newsList = data;
        }
      )
  }

  plusNews() {
    this.newsList.push({title: "Title", "description": "description", footer:"footer", date:"12.12.2015"});
  }

}
