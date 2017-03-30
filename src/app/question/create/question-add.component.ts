import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionaryService } from "../.questionary.service";
import { Questionary, Question, Option, Step } from "./types";

@Component({
  moduleId: module.id,
  selector: 'question-add',
  templateUrl: './question-add.component.html'
})
export class QuestionAddComponent implements OnInit {
  session: Session;
  userService: UserService;
  qService: QuestionaryService;
  question: Question= new Question();
  sId : string;

  constructor (private _location: Location, private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['stepId'] !== undefined) {
        this.sId = params["stepId"];
      }
    });
  }

  getQuestionTypes(): string[] {
    return Question.TYPES;
  }
  create() {
    this.question.step_id = this.sId;
    this.qService.addQuestion(this.question);
    //this.router.navigate(['/questionaries/'+this.sId]);
    this._location.back();
  }
  cancel() {
    //this.router.navigate(['/questionaries/'+this.sId]);
    this._location.back();
  }
}

