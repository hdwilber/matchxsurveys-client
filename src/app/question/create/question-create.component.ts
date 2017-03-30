import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionService } from "../common/question.service";

import { Question, Questionary, Option, Group } from "../../questionary/common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'question-create',
  templateUrl: './question-create.component.html'
})

export class QuestionCreateComponent implements OnInit {
  question: Question = new Question();
  groupId: number;
  tmp:any;

  constructor (private router: Router, private qService:QuestionService, public dialogRef: MdDialogRef<QuestionCreateComponent>) {
    this.tmp = { 
      code: null,
      name: null,
      type: null,
      subType: null,
      label: null
    };
  }
  ngOnInit():void  {
  }

  create() {
    this.qService.appendIn(this.groupId, {
      code: this.tmp.code,
      name: this.tmp.name,
      type: this.tmp.type.code,
      sub_type: this.tmp.subType.code,
      label: this.tmp.label
    })
    .then( q => {
      this.question = q;
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

