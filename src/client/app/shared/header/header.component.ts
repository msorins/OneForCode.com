import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";


/**
 * This class represents the header component.
 */

@Component({
  moduleId: module.id,
  selector: 'ofc-header-shared',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    public imgNumber:number = 1;
    public imgMaxNumber:number = 6;
    public showState = true;

    ngOnInit() {
      //Call image transition every 30 seconds
      Observable.interval(30000).subscribe(x => {
        this.changePicture()
      });
    }

    changePicture() {
      //Initiate the transition
      this.showState = false;

      //Chose the new image (random)
      let newImgNumber = Math.floor(Math.random() * 6) + 1;
      while(this.imgNumber != newImgNumber)
        this.imgNumber = Math.floor(Math.random() * 6) + 1;

      //Complete the transition after 300
      let finishTransition = Observable.interval(450);
      finishTransition.first().subscribe( x => {
          this.showState = true;
        })

    }
}
