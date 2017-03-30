import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { OptionService } from "../common/option.service";

import { Question, Questionary, Option, Group } from "../../questionary/common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'option-create',
  templateUrl: './option-create.component.html'
})

export class OptionCreateComponent implements OnInit {
  option: Option = new Option();
  questionId: number;
  tmp:any;

  constructor (private router: Router, private oService:OptionService, public dialogRef: MdDialogRef<OptionCreateComponent>) {
    this.tmp = { 
      type: null,
      value: null,
      data: null,
      extra: null
    };
  }
  ngOnInit():void  {
  }

  create() {
    this.oService.appendIn(this.questionId, {
      type: this.tmp.type.code,
      value: this.tmp.value,
      extra: this.tmp.extra,
      label: this.tmp.label
    })
    .then( o => {
      this.option = o;
      this.dialogRef.close(o);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  getOptionTypes() {
    return Option.TYPES;
  }
}

