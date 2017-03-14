/**
 * Created by so on 14/03/2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class TimeDifferenceService {

  ngOnInit() {

  }

  timeDifference(previous: any) {

    let current = new Date().getTime();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return '' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return '' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return '' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

}
