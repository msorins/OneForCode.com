/**
 * Created by so on 06/02/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NewsInterface} from "../news.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-newsView',
  templateUrl: 'view-news.component.html',
  styleUrls: ['view-news.component.css']
})

export class ViewNewsComponent implements OnInit{
  public test: string;

  public editable:boolean = false;
  public newsList: NewsInterface[] = [];
  public x: NewsInterface = {title: "This is title", "description": "This is the description", footer:"Footer small", date:"12.12.2015"};
  public y: NewsInterface = {title: "This is 2nd title", "description": "What is what?", footer:"Mini-Footer yeap", date:"12.12.2015"};


  ngOnInit() {
    this.newsList.push(this.x);
    this.newsList.push(this.y);
  }

  save() {

  }

}
