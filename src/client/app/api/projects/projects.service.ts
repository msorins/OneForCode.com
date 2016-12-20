import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';  // for debugging

import { ProjectInterface } from '../../projects/project.interface'
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

  addNewProject(firebaseUID:string, obj : ProjectInterface):  Observable<string[]> {
    let objJSON = JSON.stringify(obj); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log(objJSON);

    return this.http.post('http://localhost:3000/api/projects/new?firebaseUID=' + firebaseUID, objJSON, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .do(data => console.log('addNewProject:', data))

  }

  getProjectsByUser(firebaseUID: string): Observable<ProjectInterface[]> {
    return this.http.get('http://localhost:3000/api/projects/byUser?firebaseUID=' + firebaseUID)
      .map((res:Response) => res.json())
      .do(data => console.log('getProjectsByUser:', data));  // debug
  }

  getProjectByTitle(title: string): Observable<ProjectInterface> {
    return this.http.get('http://localhost:3000/api/projects/byTitle?title=' + title)
      .map((res:Response) => res.json())
      .do(data => console.log('getProjectByTitle', data));  // debug
  }

  getPulls(gitUserName: string, gitRepoName: string): Observable<ProjectInterface> {
    return this.http.get('http://localhost:3000/api/projects/getPulls?gitUserName=' + gitUserName + '&gitRepoName=' + gitRepoName)
      .map((res:Response) => res.json())
      .do(data => console.log('getPulls', data));// debug
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
