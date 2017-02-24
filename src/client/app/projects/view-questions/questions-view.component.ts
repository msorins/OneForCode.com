/**
 * Created by so on 24/02/2017.
 */
import {Component, Input, OnChanges} from '@angular/core';
import {QuestionsInterface} from "../questions.interface";
import {AuthService} from "../../auth/services/auth-service";


@Component({
  moduleId: module.id,
  selector: 'ofc-questionsView',
  templateUrl: 'questions-view.component.html',
  styleUrls: ['questions-view.component.css']
})

export class QuestionsViewComponent implements OnChanges{
  @Input('questions') questions: QuestionsInterface[];
  emptyQuestion: QuestionsInterface;
  editable = false;

  constructor(public _authService: AuthService) {
    this.emptyQuestion = {byUserFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', date: ''}
  }

  ngOnChanges() {
    if(this.questions == null) {
      this.questions = [];
    }
  }

  addQuestion() {
    console.log("Question added");
    this.questions.push({byUserFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', date: ''});
    console.log("da: " + JSON.stringify(this.questions));
  }

}
