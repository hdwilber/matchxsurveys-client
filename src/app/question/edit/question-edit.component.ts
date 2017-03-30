import { Component, OnInit} from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { UserService } from "../../user/common/user.service";
import { QuestionService } from "../common/question.service";
import { LogicService } from "../../logic/common/logic.service";

import {E,Option, Group, Question, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";
import { QuestionaryService } from '../../questionary/common/questionary.service';

import { LogicCreateComponent } from "../../logic/create/logic-create.component";
import { OptionCreateComponent } from "../../option/create/option-create.component";

import { Location } from '@angular/common';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
  selector: 'question-edit',
  templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent implements OnInit {
  question: Question;

  constructor (private route: ActivatedRoute, private router: Router, private _location: Location, private qService:QuestionService, public dialog: MdDialog, private lService: LogicService) {
  }
  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['questionId'] !== undefined) {
        this.qService.getById(params['questionId'])
        .then(q => {
          this.question = q;
        });
      }
    });
  }

  startCreateOption() {
    let dialogRef = this.dialog.open(OptionCreateComponent);
    dialogRef.componentInstance['questionId'] = this.question.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.question.options.push(result)
      }
    });
  }
  startEditLogic(e) {
    this.router.navigate(['/logic/'+e.id + '/edit']);
  }
  startCreateLogic() {
    let dialogRef = this.dialog.open(LogicCreateComponent);
    dialogRef.componentInstance['elementId'] = this.question.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.question.logics.push(result)
      }
    });
  }
  goToBack() {
    this._location.back();
  }
  deleteQuestion() {
    this.qService.delete(this.question)
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
        this.question.logics.splice(this.question.logics.indexOf(l), 1);
        console.log("Logic Deleted Successfully");
      }
    })
  }
  //setLogic(logic: Logic): void {
    //this.currentLogic = logic;
    //this.showLogicEditor = true;
    //this.qService.getLogicHierarcy(logic)
      //.then(ml => { 
        //this.jsonLogic = ml;
        //console.log(ml);
      //});
  //}

  //editLogic(l: Logic) : void {
    //this.router.navigate(['/questionaries/'+this.questionary.uid+ '/logics/'+l.uid+'/edit']);
  //}

  //getLogicActions(): string[] {
    //return Logic.ACTIONS;
  //}

  //addOption(): void {
    //console.log(this.newOption);
    //this.qService.addOption(this.newOption)
      //.then(o => {
        //this.options.push(o);
        //this.newOption = new Option();
        //this.newOption.question_id = this.question.uid;
       //});
  //}
  //addMinMaxRange(): void {
    //this.qService.addOption(this.newOption)
      //.then(o => { this.options.push(o); this.newOption = new Option();
        //this.newOption.question_id = this.question.uid });
    //this.qService.addOption(this.newOption2)
      //.then(o => { this.options.push(o); this.newOption2 = new Option();
        //this.newOption2.question_id = this.question.uid });
  //}

  //getMaxLevel(): number{
    //return (this.options[0].value > this.options[1].value)?this.options[0].value : this.options[1].value;
  //}
  //getMinLevel(): number {
    //return (this.options[0].value < this.options[1].value)?this.options[0].value : this.options[1].value;
  //}

  //addLogic():void {
    //this.newLogic.target_id = this.question.uid;
    //this.newLogic.target_type = 'question';
    //this.qService.addLogic(this.question.uid, this.newLogic)
    //.then ( ll => {
      //if (this.question.logics == undefined) {
        //this.question.logics = new Array();
      //}
      //this.question.logics.push(ll);
    //});
  //}

  //deleteLogic(l: Logic): void {
    //this.qService.removeLogic(l)
      //.then (a => {
        //if (this.question.logics != null)
          //this.question.logics.splice(this.question.logics.indexOf(l));
      //});
  //}
  //create() {
  //}
  //cancel() {
  //}
}

