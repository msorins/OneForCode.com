/**
 * Created by so on 24/02/2017.
 */
import {Component, Input, OnChanges} from '@angular/core';
import {QuestionsInterface} from "../questions.interface";
import {AuthService} from "../../auth/services/auth-service";
import {ProjectInterface} from "../project.interface";
import {ProjectsService} from "../../api/projects/projects.service";
import {FeaturesProjectInterface} from "../features-project.interface";


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

  constructor(public _authService: AuthService, public _projectService: ProjectsService) {
    this.emptyQuestion = {byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', date: ''}
  }

  ngOnChanges() {
    if(this.questions == null) {
      this.questions = [];
    }
  }

  addQuestion() {
    console.log("Question added");
    this.questions.unshift({byFirebaseUID: this._authService.getFirebaseUID(), byUserName: this._authService.getUserName(), answer: 'answer', question: 'Question', date: '', editable: true});
    console.log("da: " + JSON.stringify(this.questions));
  }

  saveQuestions() {
    //Save the changed ques
    this._projectService.setFeatureQuestions(this.project.byFirebaseUID, this.project.title, this.feature.title, this.questions).subscribe(
      data => console.log('projectServiceData: ' +  data)
    )
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
    this.saveQuestions();
  }

}
