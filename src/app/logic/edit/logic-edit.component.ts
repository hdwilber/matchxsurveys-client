import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionaryService } from "../../questionary/common/questionary.service";
import { LogicService } from "../common/logic.service";
import { GroupService } from "../../group/common/group.service";
import { QuestionService } from "../../question/common/question.service";
import { E, Match, MatchLogic, Logic, Question, Questionary, Option, Group } from "../../questionary/common/types";
import { TreeNode } from "../../tree-view/types";
import { MatchLogicCreateComponent  } from "../match-logic/match-logic-create.component";
import { MatchCreateComponent  } from "../match/match-create.component";

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({

  selector: 'logic-edit',
  templateUrl: './logic-edit.component.html'
})
export class LogicEditComponent implements OnInit {
  logic: Logic;
  selected: any;

  constructor (private _location: Location, private route: ActivatedRoute, private router: Router, private gService: GroupService, private qService: QuestionService, private questService:QuestionaryService, private lService: LogicService, public dialog: MdDialog) {
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['logicId'] !== undefined) {
        this.lService.getById(params["logicId"])
        .then( l => {
          this.logic = l; 
          this.selected = this.logic;
          console.log(l);
          this.questService.getById(l.questionary.id)
          .then( q => {
            this.logic.questionary = q;
          });
        });
      }
    });
  }

  //getOperatorTypes() {
    //return Match.OPERATORS;
  //}
  //getMatchLogicBooleans() {
    //return MatchLogic.BOOL_TYPES;
  //}

  startCreateMatch() {
    let dialogRef = this.dialog.open(MatchCreateComponent);
    dialogRef.componentInstance['elementId'] = this.selected.id;
    dialogRef.componentInstance['questionary'] = this.logic.questionary;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        if (this.selected.children === undefined) {
          this.selected.children = new Array();
        }
        this.selected.children.push(result)
      }
    });
  }
  startCreateMatchLogic() {
    let dialogRef = this.dialog.open(MatchLogicCreateComponent);
    dialogRef.componentInstance['elementId'] = this.selected.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        if (this.selected.children === undefined) {
          this.selected.children = new Array();
        }
        this.selected.children.push(result)
      }
    });
  }
  goToBack() {
    this._location.back();
  }

  deleteSelected() {
    if (this.selected != null) {
      if (this.selected.type == 'match-logic') {
        this.lService.deleteMatchLogic(this.selected)
        .then(a => {
          if (a) {
            delete this.selected;
            this.selected = this.logic;
            this.lService.getById(this.logic.id)
            .then( l => {
              this.logic = l; 
              this.questService.getById(l.questionary.id)
              .then( q => {
                this.logic.questionary = q;
              });
            });
          }
        })
      } else if (this.selected.type == 'match') {
        console.log('To be implemented');
      }
    }
  }


  handleSelectedNode(d:any) {
    console.log("something has changed");
    this.selected = d;
    console.log(d);
  }
}

