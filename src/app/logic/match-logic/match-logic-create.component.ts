import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { LogicService } from "../common/logic.service";

import { MatchLogic, Logic, Question, Questionary, Option, Group } from "../../questionary/common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'match-logic-create',
  templateUrl: './match-logic-create.component.html'
})

export class MatchLogicCreateComponent implements OnInit {
  elementId: number;
  tmp:any;

  constructor (private router: Router, private lService:LogicService, public dialogRef: MdDialogRef<MatchLogicCreateComponent>) {
    this.tmp = { 
      bool: null
    };
  }
  ngOnInit():void  {
  }

  getBoolTypes(): any {
    return MatchLogic.BOOL_TYPES;
  }

  create() {
    this.lService.appendMatchLogic(this.elementId, {
      bool: this.tmp.bool
    })
    .then( q => {
      this.dialogRef.close(q);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}

