import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { LogicService } from "../common/logic.service";
import { GroupService } from "../../group/common/group.service";
import { QuestionService } from "../../question/common/question.service";

import { Match, MatchLogic, Logic, Question, Questionary, Option, Group } from "../../questionary/common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'match-create',
  templateUrl: './match-create.component.html'
})

export class MatchCreateComponent implements OnInit {
  elementId: number;
  questionary: Questionary;
  tmp:any;

  constructor (private router: Router, private gService: GroupService, private qService: QuestionService, private lService:LogicService, public dialogRef: MdDialogRef<MatchCreateComponent>) {
    this.tmp = { 
      operator: null,
      target_id: null,
      target_option_id : null,
      target_value: null,
      group: null,
      target: null,
      option: null
    };
  }
  ngOnInit():void  {
    console.log(this.questionary);
  }

  getOperatorTypes(): any {
    return Match.OPERATOR_TYPES;
  }

  selectGroup() {
    if (this.tmp.group != null) {
      this.gService.getById(this.tmp.group.id)
      .then(q => {
        this.tmp.group.questions = q.questions;
        console.log(q);
      });
    }
  }

  selectTarget() {
    if (this.tmp.target != null) {
      this.qService.getById(this.tmp.target.id)
      .then(q=> {
        this.tmp.target.options = q.options;
      });
    }
  }

  create() {
    this.lService.appendMatch(this.elementId, {
      operator: this.tmp.operator,
      target_id: this.tmp.target.id,
      target_option_id: this.tmp.option.id,
      target_value: null
    }
    )
    .then( q => {
      this.dialogRef.close(q);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}

