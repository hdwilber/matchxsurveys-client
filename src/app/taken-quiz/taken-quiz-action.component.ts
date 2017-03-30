import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/user"
import { UserService } from "./../user/user.service";
import { QuestionaryService } from "./questionary.service";
import { Answer, Question, TakenQuiz, Questionary, Option, Group} from "./types";

@Component({
  moduleId: module.id,
  selector: 'taken-quiz-action',
  templateUrl: './taken-quiz-action.component.html'
})
export class TakenQuizActionComponent implements OnInit {
  qService: QuestionaryService;
  takenQuiz: TakenQuiz;
  questionary: Questionary; 
  currentGroup: Group;
  question: Question;

  constructor (private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.qService = questionService;
    this.questionary = null;
    this.takenQuiz = null;
    this.currentGroup = null;
    this.question = null;

  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['takenQuizId'] !== undefined) {
        var auxId = params["takenQuizId"];
        this.qService.getTakenQuiz(auxId)
        .then(q => {
          this.takenQuiz = q;
          this.questionary = q.questionary;
          //console.log(q);

          this.qService.getQuestionary(q.questionary_id)
          .then(qu=> {
            this.takenQuiz.questionary = qu;
            this.questionary = qu;
            this.qService.getNextQuestion(this.takenQuiz, null)
              .then (que => {
                console.log(que);
                this.currentQuestion = que.question.data;
                this.currentStep = que.step.data;
                this.selection = new Selection();
                this.selection.uid = que.selection;
              });
          });
        });
      }
    });
  }

  actionStep(s):void {
    this.currentStep = s;
  }

  addStep(): void {
    this.router.navigate(['/questionaries/'+this.questionary.uid+ '/steps/add']);
  }
  addMatch(): void {
    this.router.navigate(['/questionaries/'+ this.questionary.uid + '/matchs/add']);
  }


  handleChosenData(data:SelectionData):void {
    this.selection.question_id = data.question_id;
    this.selection.taken_quiz_id = this.takenQuiz.uid;
    switch(this.currentQuestion.type) {
      case "radio": 
        this.selection.option_id = data.option_id;
        this.selection.value = null;
        break;
      case "level":
        this.selection.option_id = null;
        this.selection.value = data.value;
        break;
      case "remark":
        this.selection.value = 1;
        this.selection.option_id = null;
        break;
      case "text": 
        this.selection.option_id = null;
        this.selection.value = 1;
        this.selection.valueText = data.text;
        break;
    }
    this.qService.getNextQuestion(this.takenQuiz, this.selection)
      .then(que => {
        console.log(que);
        this.currentQuestion = que.question.data;
        this.currentStep = que.step.data;
        this.selection = new Selection();
        this.selection.uid = que.selection;
      });
  }
  //handleChosenOption(o) {
    //console.log("Sending Chosen option");
    //console.log(o);
    //this.selection.option_id = o.uid;
    //this.selection.value = null;
    //this.selection.question_id = o.question_id;
    //this.selection.taken_quiz_id = this.takenQuiz.uid;
    //this.qService.getNextQuestion(this.takenQuiz, this.selection)
      //.then(que => {
        //console.log(que);
        //this.currentQuestion = que.question.data;
        //this.currentStep = que.question.data;
        //this.selection = new Selection();
        //this.selection.uid = que.selection;
      //});
  //}
  //handleChosenLevel(o) {
    //console.log("Sending selected Level");
    //this.selection.value = o.value;
    //this.selection.option_id = null;
    //this.selection.question_id = o.question_id;
    //this.selection.taken_quiz_id = this.takenQuiz.uid;
    //this.qService.getNextQuestion(this.takenQuiz, this.selection)
      //.then(que => {
        //console.log(que);
        //this.currentQuestion = que.question.data;
        //this.currentStep = que.question.data;
        //this.selection = new Selection();
        //this.selection.uid = que.selection;
      //});
  //}
  //handleChosenRemark(o) {
    //console.log("Sending checked Remark");
    //this.selection.value = parseInt(o.value);
    //this.selection.option_id = null;
    //this.selection.question_id = o.question_id;
    //this.selection.taken_quiz_id = this.takenQuiz.uid;
    //this.qService.getNextQuestion(this.takenQuiz, this.selection)
      //.then(que => {
        //console.log(que);
        //this.currentQuestion = que.question.data;
        //this.currentStep = que.question.data;
        //this.selection = new Selection();
        //this.selection.uid = que.selection;
      //});
  //}
}
