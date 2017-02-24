/**
 * Created by so on 24/02/2017.
 */
import {Component, Input, OnChanges} from '@angular/core';
import {QuestionsInterface} from "../questions.interface";
import {AuthService} from "../../auth/services/auth-service";
import {ProjectInterface} from "../project.interface";


@Component({
  moduleId: module.id,
  selector: 'ofc-questionsView',
  templateUrl: 'questions-view.component.html',
  styleUrls: ['questions-view.component.css']
})

export class QuestionsViewComponent implements OnChanges{
  @Input('project') project: ProjectInterface;
  @Input('questions') questions: QuestionsInterface[];
  emptyQuestion: QuestionsInterface;
  editable = false;

  constructor(public _authService: AuthService) {
    this.emptyQuestion = {byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', date: ''}
  }

  ngOnChanges() {
    if(this.questions == null) {
      this.questions = [];
    }
  }

  addQuestion() {
    console.log("Question added");
    this.questions.push({byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', date: ''});
    console.log("da: " + JSON.stringify(this.questions));
  }

  save() {

  }

}
