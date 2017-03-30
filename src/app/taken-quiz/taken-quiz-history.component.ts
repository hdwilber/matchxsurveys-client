import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/user"
import { UserService } from "./../user/user.service";
import { QuestionaryService } from "./questionary.service";
import { SelectionData, Selection, Question, TakenQuiz, Questionary, Option, Step } from "./types";

@Component({
  moduleId: module.id,
  selector: 'taken-quiz-history',
  templateUrl: './taken-quiz-history.component.html'
})
export class TakenQuizHistoryComponent implements OnInit {
  session: Session;
  userService: UserService;
  qService: QuestionaryService;
  takenQuiz: TakenQuiz;
  questionary: Questionary; 
  selections: Selection[];

  constructor (private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
    this.questionary = null;
    this.selections = null;

  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['takenQuizId'] !== undefined) {
        var auxId = params["takenQuizId"];
        this.qService.getTakenQuiz(auxId)
        .then(q => {
          this.takenQuiz = q;
          this.questionary = q.questionary;
          console.log(q);
          this.qService.getQuestionary(q.questionary_id)
          .then(qu=> {
            this.takenQuiz.questionary = qu;
            this.questionary = qu;

          });
          this.qService.getSelections(this.takenQuiz) 
          .then(ss=> {
            this.selections = ss;
          });
        });
      }
    });
  }
}
