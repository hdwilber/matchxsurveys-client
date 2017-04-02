import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionaryService } from "../../questionary/common/questionary.service";
import { TakenQuizService } from "../common/taken-quiz.service";
import {E,Answer, Option, Group, Question, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";

@Component({
  selector: 'taken-quiz-history',
  templateUrl: './taken-quiz-history.component.html',
  styleUrls: ['./taken-quiz-history.component.less']

})
export class TakenQuizHistoryComponent implements OnInit {
  takenQuiz: TakenQuiz; 

  constructor (private route: ActivatedRoute, private router: Router, private uService: UserService, private qService:QuestionaryService, private tqService: TakenQuizService ) {
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['takenQuizId'] !== undefined) {
        var auxId = params["takenQuizId"];

        this.tqService.getHistory(auxId)
        .then (tq => {
          this.takenQuiz = tq;
          console.log(tq);
        });
      }
    });
  }
}
