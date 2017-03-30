import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { GroupService } from "../common/group.service";

import { Questionary, Option, Group } from "../../questionary/common/types";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'group-create',
  templateUrl: './group-create.component.html'
})

export class GroupCreateComponent implements OnInit {
  group: Group = new Group();
  questionaryId: number;

  constructor (private router: Router, private gService:GroupService, public dialogRef: MdDialogRef<GroupCreateComponent>) {
  }
  ngOnInit():void  {
  }

  create() {
    this.gService.appendIn(this.questionaryId, this.group)
    .then( q => {
      this.group = q;
      this.dialogRef.close(q);
    })
  }

  cancel() {
    this.dialogRef.close(null);
  }
}

