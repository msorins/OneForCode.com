/**
 * Created by so on 14/03/2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class TimeService {

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

  timestampToTime(timestamp: any) {

    timestamp = parseInt(timestamp);

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return date.getDay() + ". " + date.getMonth() + ". " + date.getFullYear();

  }

}
