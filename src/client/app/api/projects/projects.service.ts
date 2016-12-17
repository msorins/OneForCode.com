import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';  // for debugging

import { AddProject } from '../../projects/add-project/add-project.interface'
import {Subscription} from "rxjs";

@Injectable()
export class ProjectsService {


  constructor(private http: Http) {}

  getOpenProjects(): Observable<string[]> {
    return this.http.get('/assets/data.json')
                    .map((res: Response) => res.json())
                    .do(data => console.log('getOpenProjects data:', data))  // debug
                    .catch(this.handleError);
  }

  addNewProject(obj : AddProject): Subscription {
    let objJSON = JSON.stringify(obj); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log(objJSON);

    return this.http.post('http://localhost:3000/api/projects/new', objJSON, options) // ...using post request
      .map((res:Response) => res) // ...and calling .json() on the response to return data
      .do(data => console.log('addNewProject:', data))
      .subscribe();

  }


  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
