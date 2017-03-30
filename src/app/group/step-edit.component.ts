import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/user"
import { UserService } from "./../user/user.service";
import { QuestionaryService } from "./questionary.service";
import { Questionary, Option, Step, Question} from "./types";

@Component({
  moduleId: module.id,
  selector: 'step-edit',
  templateUrl: './step-edit.component.html'
})
export class StepEditComponent implements OnInit {
  session: Session;
  userService: UserService;
  qService: QuestionaryService;
  questionary: Questionary; 
  step: Step;
  questions: Question[];

  constructor (private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
    this.questionary = null;
    this.step = null;
    this.questions = null;
  }
  ngOnInit():void  {
    this.userService.getUser()
      .then(u => {
        if (u.type == "admin"){
          this.route.params.forEach((params: Params) => {
            if (params['questionaryId'] !== undefined) {
              var qId = params["questionaryId"];
              this.qService.getQuestionary(qId)
              .then(q => {
                this.questionary = q;
                if (q.steps.length >0) {
                  for(var i=0; i < this.questionary.steps.length; i++) {
                    if (this.questionary.steps[i].uid == params['stepId']) {
                      this.step = this.questionary.steps[i];
                      this.qService.getQuestions(this.step['uid'])
                        .then(qs => {
                          this.questions = qs;
                          this.step.questions = qs;
                        });
                      break;
                    }
                  }
                }
              });
            }
          });
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  update() {
  }

  addQuestion(): void {
  }
  cancel() : void {
    this.router.navigate(['/questionaries/'+this.questionary.uid+'/edit']);
  }

}

