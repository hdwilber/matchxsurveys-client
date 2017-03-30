import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionaryService } from "../common/questionary.service";
import { Questionary, Option, Group } from "../common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'questionary-create',
  templateUrl: './questionary-create.component.html'
})

export class QuestionaryCreateComponent implements OnInit {
  quest: Questionary = new Questionary();

  constructor (private router: Router, private qService:QuestionaryService, public dialogRef: MdDialogRef<QuestionaryCreateComponent>) {
  }
  ngOnInit():void  {
  }

  create() {
    this.qService.create(this.quest)
    .then( q => {
      this.quest = q;
      this.dialogRef.close(q);
    })
  }

  cancel() {
    this.dialogRef.close(null);
  }
}

