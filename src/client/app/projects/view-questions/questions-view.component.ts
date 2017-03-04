/**
 * Created by so on 24/02/2017.
 */
import {Component, Input, OnChanges} from '@angular/core';
import {QuestionsInterface} from "../questions.interface";
import {AuthService} from "../../auth/services/auth-service";
import {ProjectInterface} from "../project.interface";
import {ProjectsService} from "../../api/projects/projects.service";
import {FeaturesProjectInterface} from "../features-project.interface";
import {NotificationsService} from "../../api/notifications/notifications.service";
import {NotificationsInterface} from "../../api/notifications/notifications.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-questionsView',
  templateUrl: 'questions-view.component.html',
  styleUrls: ['questions-view.component.css']
})

export class QuestionsViewComponent implements OnChanges{
  @Input('project') project: ProjectInterface;
  @Input('feature') feature: FeaturesProjectInterface;
  @Input('questions') questions: QuestionsInterface[];
  emptyQuestion: QuestionsInterface;
  editable = false;
  newQuestion = false;

  currentPage = 1;
  numberOfQuestionsPerPage = 3;

  constructor(public _authService: AuthService, public _projectService: ProjectsService, public _notificationService: NotificationsService) {
    this.emptyQuestion = {byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'waiting for answer', question: 'Question', askedTimeStamp: new Date().getTime().toString(), status: 'open' }
  }

  ngOnChanges() {
    if(this.questions == null) {
      this.questions = [];
    }
  }

  addQuestion() {
    console.log("Question added");
    this.newQuestion = true;
    this.questions.unshift({byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'waiting for answer', question: 'Question', askedTimeStamp: new Date().getTime().toString(), editable: true, edited: false, status: 'open'});
  }

  saveQuestion(i: number) {
    //First add some attributes to the question before all the questions are saved

    //A new question is asked
    if(this.newQuestion == true)
      this.questions[i].askedTimeStamp = new Date().getTime().toString();
    else { // A question is answered
      this.questions[i].answeredTimeStamp = new Date().getTime().toString();
      this.questions[i].status = 'closed';
    }

    this.saveQuestions();
  }

  saveQuestions() {
    //Save all the questions and send notifications

    //A new question is asked
    if(this.newQuestion == true) {
      //Send the notification to the owner of the project
      let notificationObjAsked: NotificationsInterface = {
        "id" : 4,
        "message": this._authService.getUserName() + " asked a question on " + this.project.title + "/" + this.feature.title,
        "timestamp": new Date().getTime().toString(),
        "url": "project/" + this.project.title
      };

      this._notificationService.sendNotification(this.project.byFirebaseUID, notificationObjAsked).subscribe(
        data => console.log('saveQuestions notification: ' + data)
      );
    }

    //A question is answered
    if(this.newQuestion == false) {
      for(let i = 0; i < this.questions.length; i++) {
        if(this.questions[i].edited == true && this.questions[i].editable == false) {
          //Send the answer notification to the one who asked it
          let notificationObjAnswered: NotificationsInterface = {
            "id" : 5,
            "message": this.project.byUserName + " answered your question on " + this.project.title + "/" + this.feature.title,
            "timestamp": new Date().getTime().toString(),
            "url": "project/" + this.project.title
          };

          this._notificationService.sendNotification(this.questions[i].byFirebaseUID, notificationObjAnswered).subscribe(
            data => console.log('saveQuestions notification: ' + data)
          );
        }
      }
    }

    //Save the changed questions
    this._projectService.setFeatureQuestions(this.project.byFirebaseUID, this.project.title, this.feature.title, this.questions).subscribe(
      data => console.log('projectServiceData: ' +  data)
    )
  }

  removeQuestion(index: number) {
    index += this.numberOfQuestionsPerPage * (this.currentPage - 1);
    this.questions.splice(index, 1);
    this.saveQuestions();
  }

  pagination(objList:any[], page:number, numberOfQuestionsPerPage: number) {
    return objList.slice(numberOfQuestionsPerPage * (page - 1), numberOfQuestionsPerPage * page);
  }

  canLoadMorePages(objList:any[], page:number, numberOfQuestionsPerPage: number) {
    if(numberOfQuestionsPerPage * page < objList.length)
      return true;
    return false;
  }

  timeDifference(previous:any) {
    let current = new Date().getTime();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

   else if (elapsed < msPerMonth) {
      return '' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return '' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
      return '' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}
}
