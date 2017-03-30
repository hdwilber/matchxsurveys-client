import { Component, OnInit} from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { GroupService } from "../common/group.service";
import { LogicService } from "../../logic/common/logic.service";
import { QuestionService } from '../../question/common/question.service';
import { QuestionaryService } from '../../questionary/common/questionary.service';

import {E,Option, Group, Question, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";

import { Location } from '@angular/common';
import {MdDialog, MdDialogRef} from '@angular/material';

import { QuestionCreateComponent } from '../../question/create/question-create.component';
import { LogicCreateComponent } from '../../logic/create/logic-create.component';

@Component({
  selector: 'group-edit',
  templateUrl: './group-edit.component.html'
})

export class GroupEditComponent implements OnInit {
  group: Group
  selectedQuestion: Question;

  constructor (private route: ActivatedRoute, private router: Router, private _location: Location, private gService:GroupService, public dialog: MdDialog, private lService: LogicService, private qService: QuestionService) {
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['groupId'] !== undefined) {
        this.gService.getById(params['groupId'])
        .then(q => {
          this.group = q;
          console.log(q);
        });
      }
    });
  }
  startCreateQuestion() {
    let dialogRef = this.dialog.open(QuestionCreateComponent);
    dialogRef.componentInstance['groupId'] = this.group.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.group.questions.push(result)
      }
    });
  }
  startCreateLogic() {
    let dialogRef = this.dialog.open(LogicCreateComponent);
    dialogRef.componentInstance['elementId'] = this.group.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.group.logics.push(result)
      }
    });
  }

  startEditQuestion(s) {
    this.router.navigate(['/question/' + s.id + '/edit']);
  }

  startEditLogic(s) {
    this.router.navigate(['/logic/'+s.id+'/edit']);
  }

  goToBack() {
    this._location.back();
  }

  deleteGroup() {
    this.gService.delete(this.group)
    .then(q => {
      if (q) {
        console.log("Deleted Successfully");
        this._location.back();
      }
    })
  }

  deleteLogic(l: Logic) {
    this.lService.delete(l)
    .then(q => {
      if (q) {
        this.group.logics.splice(this.group.logics.indexOf(l), 1);
        console.log("Logic Deleted Successfully");
      }
    })

  }
  deleteQuestion(qu: Question) {
    this.qService.delete(qu)
    .then(q => {
      if (q) {
        this.group.questions.splice(this.group.questions.indexOf(qu), 1);
        console.log("Question Deleted Successfully");
      }
    })
  }
}

