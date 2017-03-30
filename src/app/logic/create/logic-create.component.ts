import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { LogicService } from "../common/logic.service";

import { Logic, Question, Questionary, Option, Group } from "../../questionary/common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'logic-create',
  templateUrl: './logic-create.component.html'
})

export class LogicCreateComponent implements OnInit {
  elementId: number;
  tmp:any;

  constructor (private router: Router, private lService:LogicService, public dialogRef: MdDialogRef<LogicCreateComponent>) {
    this.tmp = { 
      code: null,
      action: null
    };
  }
  ngOnInit():void  {
  }

  getLogicActions(): any {
    return Logic.ACTION_TYPES;
  }

  create() {
    this.lService.appendIn(this.elementId, {
      code: this.tmp.code,
      action: this.tmp.action
    })
    .then( q => {
      this.dialogRef.close(q);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  getQuestionTypes() {
    return Question.TYPES;
  }
}

