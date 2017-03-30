import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/user"
import { UserService } from "./../user/user.service";
import { QuestionaryService } from "./questionary.service";
import { Logic, MatchLogic, Match, Question, Questionary, Option, Step } from "./types";
import { TreeNode } from "./../tree-view/types";

@Component({
  moduleId: module.id,
  selector: 'logic-edit',
  templateUrl: './logic-edit.component.html'
})
export class LogicEditComponent implements OnInit {
  session: Session;
  userService: UserService;
  logic: Logic = null;
  qService: QuestionaryService;
  question: Question;
  jsonLogic: JsonLogic = null;


  constructor (private _location: Location, private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['logicId'] !== undefined) {
        this.qService.getLogic(params["logicId"])
        .then( l => {
          this.logic = l 
          this.qService.getLogicHierarcy(l)
            .then(ml => { 
              this.jsonLogic = ml;
              console.log(ml);
            });
          }
        );

      }
    });
  }

  getHierarchy(logic: Logic): void {
    this.qService.getLogicHierarcy(logic)
      .then(ml => { 
        this.jsonLogic = ml;
        console.log(ml);
      });
  }

  getQuestionTypes(): string[] {
    return Question.TYPES;
  }
  cancel() {
    //this.router.navigate(['/questionaries/'+this.sId]);
    this._location.back();
  }
}

