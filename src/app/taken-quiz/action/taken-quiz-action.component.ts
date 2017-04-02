import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionaryService } from "../../questionary/common/questionary.service";
import { TakenQuizService } from "../common/taken-quiz.service";
import {E,Answer, Option, Group, Question, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";

@Component({
  selector: 'taken-quiz-action',
  templateUrl: './taken-quiz-action.component.html',
  styleUrls: ['./taken-quiz-action.component.less']

})
export class TakenQuizActionComponent implements OnInit {
  answer: Answer = new Answer();
  takenQuiz: TakenQuiz; 
  question: Question;
  currentGroup: number = -1;
  group: Group;

  constructor (private route: ActivatedRoute, private router: Router, private uService: UserService, private qService:QuestionaryService, private tqService: TakenQuizService ) {
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['takenQuizId'] !== undefined) {
        var auxId = params["takenQuizId"];

        this.tqService.getById(auxId)
        .then (tq => {
          this.takenQuiz = tq;
          console.log(tq);
        });

        this.tqService.nextQuestion(auxId, null)
        .then (q => {
          this.answer.id = q.id;
          this.question = q.question;
          this.currentGroup = q.group.id;
          this.group = q.group;

          console.log(q);
        });
      }
    });
  }

  sendAnswer(o: Option) {
    if (this.question.type == "selection" && this.question.subType == "simple") {
      this.tqService.nextQuestion(this.takenQuiz.id,
        {
          id: this.answer.id,
          question_id: this.question.id,
          option_id: o.id
        }
      )
      .then(ans => {
          this.answer.id = ans.id;
          this.question = ans.question;
          this.currentGroup = ans.group.id;
          this.group = ans.group;
      });
    }
  }

  //actionStep(s):void {
    //this.currentStep = s;
  //}

  //addStep(): void {
    //this.router.navigate(['/questionaries/'+this.questionary.uid+ '/steps/add']);
  //}
  //addMatch(): void {
    //this.router.navigate(['/questionaries/'+ this.questionary.uid + '/matchs/add']);
  //}


  //handleChosenData(data:SelectionData):void {
    //this.selection.question_id = data.question_id;
    //this.selection.taken_quiz_id = this.takenQuiz.uid;
    //switch(this.currentQuestion.type) {
      //case "radio": 
        //this.selection.option_id = data.option_id;
        //this.selection.value = null;
        //break;
      //case "level":
        //this.selection.option_id = null;
        //this.selection.value = data.value;
        //break;
      //case "remark":
        //this.selection.value = 1;
        //this.selection.option_id = null;
        //break;
      //case "text": 
        //this.selection.option_id = null;
        //this.selection.value = 1;
        //this.selection.valueText = data.text;
        //break;
    //}
    //this.qService.getNextQuestion(this.takenQuiz, this.selection)
      //.then(que => {
        //console.log(que);
        //this.currentQuestion = que.question.data;
        //this.currentStep = que.step.data;
        //this.selection = new Selection();
        //this.selection.uid = que.selection;
      //});
  //}

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
