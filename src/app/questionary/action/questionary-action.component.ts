import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "../../user/user"
import { UserService } from "../../user/user.service";
import { QuestionaryService } from "../common/questionary.service";
import { Questionary, Option, Step } from "../common/types";

@Component({
  moduleId: module.id,
  selector: 'questionary-action',
  templateUrl: './questionary-action.component.html'
})
export class QuestionaryActionComponent implements OnInit {
  session: Session;
  userService: UserService;
  qService: QuestionaryService;
  questionary: Questionary; 
  currentStep: Step;

  constructor (private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
    this.questionary = null;
    this.currentStep = null;
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['questionaryId'] !== undefined) {
        var auxId = params["questionaryId"];
        this.qService.getQuestionary(auxId)
        .then(q => {
          this.questionary = q;
          if (q.steps.length >0) {
            this.currentStep = q.steps[0];
          }
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


}

