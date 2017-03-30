import { Component, OnInit} from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionaryService } from "../common/questionary.service";
import { GroupService } from "../../group/common/group.service";
import {E,Option, Group, Question, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../common/types";
import { TreeNode } from "../../tree-view/types";
import { GroupCreateComponent } from '../../group/create/group-create.component';

import { Location } from '@angular/common';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'questionary-edit',
  templateUrl: './questionary-edit.component.html'
})
export class QuestionaryEditComponent implements OnInit {
  questionary: Questionary; 
  selectedGroup: Group;

  constructor (private route: ActivatedRoute, private router: Router, private _location: Location, private qService:QuestionaryService, public dialog: MdDialog, private gService: GroupService) {
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['questionaryId'] !== undefined) {
        this.qService.getQuestionary(params['questionaryId'])
        .then(q => {
          this.questionary = q;
        });
      }
    });
  }
  startCreateGroup() {
    let dialogRef = this.dialog.open(GroupCreateComponent);
    dialogRef.componentInstance['questionaryId'] = this.questionary.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.questionary.groups.push(result)
      }
    });
  }
  goToBack() {
    this._location.back();
  }

  startEditGroup(g: Group) {
    this.router.navigate(['/group/'+g.id+'/edit']);
  }

  deleteQuestionary() {
    this.qService.delete(this.questionary)
    .then(q=> {
      if (q) {
        console.log("Questionary Deleted");
        this._location.back();
      }
    })
  }
/*
 *  changeQuestion(q: Question):void {
 *    this.currentQuestion = q;
 *  }
 *
 *  changeStep(d) {
 *    this.router.navigate(['/questionaries/'+this.questionary.uid+'/steps/'+d.uid+'/edit']);
 *  }
 *  setStep(s):void {
 *    this.currentStep = s;
 *    console.log(s);
 *    this.qService.getQuestions(s.uid)
 *      .then(qs => {
 *        this.currentStep.questions = qs;
 *        console.log("Loading questions ");
 *        console.log(qs);
 *      });
 *    this.qService.getLogicsFromStep(s)
 *      .then(ll => {
 *        this.currentStep.logics = ll;
 *      });
 *  }
 *
 *  editStep(): void {
 *    console.log("Trying to edit this one");
 *    this.router.navigate(['/questionaries/'+this.questionary.uid+ '/steps/' + this.currentStep.uid+'/edit']);
 *  }
 *
 *  addStep(): void {
 *    this.router.navigate(['/questionaries/'+this.questionary.uid+ '/steps/add']);
 *  }
 *  addQuestion(): void {
 *    this.router.navigate(['/steps/'+this.currentStep.uid+ '/questions/add']);
 *  }
 *
 *  addMatch(): void {
 *    this.router.navigate(['/questionaries/'+ this.questionary.uid + '/matchs/add']);
 *  }
 *
 *  getLogicActions(): string[] {
 *    return Logic.ACTIONS;
 *  }
 *  editLogic(l: Logic): void {
 *    this.router.navigate(['/questionaries/'+this.questionary.uid+'/logics/'+l.uid+'/edit']);
 *  }
 *
 *  deleteLogic(l: Logic): void {
 *    this.qService.removeLogic(l)
 *    .then (a => {
 *      if (this.currentStep.logics != null)
 *        this.currentStep.logics.splice(this.currentStep.logics.indexOf(l));
 *    });
 *
 *  }
 *  
 *  addLogic(): void {
 *    this.newLogic.target_id = this.currentStep.uid;
 *    this.newLogic.target_type = 'step';
 *    this.qService.addLogicFromStep(this.currentStep.uid, this.newLogic)
 *    .then ( ll => {
 *      if (this.currentStep.logics == undefined) {
 *        this.currentStep.logics = new Array();
 *      }
 *      this.currentStep.logics.push(ll);
 *    });
 *  }
 */

  deleteGroup(g: Group) {
    this.gService.delete(g)
    .then(q => {
      if (q) {
        console.log("Group Deleted Successfully");
        this.questionary.groups.splice(this.questionary.groups.indexOf(g), 1);
      }
    })
  }
}

