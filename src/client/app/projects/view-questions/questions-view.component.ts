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

  constructor(public _authService: AuthService, public _projectService: ProjectsService, public _notificationService: NotificationsService) {
    this.emptyQuestion = {byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', askedTimeStamp: new Date().getTime().toString(), status: 'Open' }
  }

  ngOnChanges() {
    if(this.questions == null) {
      this.questions = [];
    }
  }

  addQuestion() {
    console.log("Question added");
    this.newQuestion = true;
    this.questions.unshift({byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', askedTimeStamp: new Date().getTime().toString(), editable: true, edited: false, status: 'Open'});
  }

  saveQuestions() {

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
            "id" : 4,
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
    this.questions.splice(index, 1);
    this.saveQuestions();
  }

}
