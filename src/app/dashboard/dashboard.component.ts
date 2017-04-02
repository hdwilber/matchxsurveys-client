import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "./../user/common/types"
import { UserService } from "../user/common/user.service";
import { QuestionaryService } from "../questionary/common/questionary.service";
import { TakenQuizService } from "../taken-quiz/common/taken-quiz.service";
import {E,Option, Group, Question, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../questionary/common/types";
import { TreeNode } from "./../tree-view/types";
import { QuestionaryCreateComponent } from "./../questionary/create/questionary-create.component";


import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  //moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  questionaries: Questionary[] = null;
  takenQuizzes: TakenQuiz[] = null;

  popupQuest = { edit: false, add: false };
  popupQuestion = { edit: false, add: false };
  popupGroup = { edit: false, add: false };
  popupOption = { edit: false, add: false };
  popupLogic = { manager: false, add: false, edit: false};

  questionary:  Questionary = new Questionary();
  group: Group = new Group();
  selected = {
    quest: null,
    group: null,
    question: null,
    forLogic: {
      target: null,
      option: null,
      group: null,
      operator: null
    },
    logic: {
      target: null,
      logics: null,
      logic: null
    },
    matchLogic: {
      target: null
    },
    option: null
  };
  tmp: any = null;

  tmps = {
    group: null,
    quest: null,
    question: null,
    option: null,
    logic: null
  };
  
  constructor (private router: Router, private qService :QuestionaryService, private tqService: TakenQuizService, public dialog: MdDialog) {
    this.tmp = {
      code: "",
      label: ""
    }
  }
  ngOnInit():void  {
    this.qService.getQuestionaries() 
      .then(qs => {this.questionaries = qs; console.log(qs)});
    this.qService.getTakenQuizzes()
      .then(tq => {this.takenQuizzes = tq; console.log(tq);});
  }
  selectQuestion(q: Question): void {
    this.selected.question = q;
    this.popupGroup.edit = true;
  }
  selectGroup(g: Group): void {
    this.selected.group = g;
    this.popupGroup.edit = true;
    this.getQuestionsByGroup(g);
    console.log("GRoup selected: ");
    console.log(g);
  }

  getBoolTypes(): any {
    return MatchLogic.BOOL_TYPES;
  }
  getOperatorTypes(): any {
    return Match.OPERATOR_TYPES;
  }
  getQuestionTypes(): any{
    return Question.TYPES;
  }
  getLogicActions(): any {
    return Logic.ACTION_TYPES;
  }

  getOptionTypes() : any {
    var a = this.selected.question;
    var tt: any = Question.TYPES.find(function(v: any) {
      if (a.type == v.code)
        return true;
      return false;
    });

    if (tt.subTypes !== undefined){
      var ts = tt.subTypes.find(function(v:any) {
        if (a.subType == v.code)
          return true;
        return false;
      });
      if (tt != null && ts != null) {
        return ts.options;
      } 
    } 

    return [];
  }

  groupSelectedForLogic() {

  }

  startAddOption() {
    this.tmps.option = {
      code: null,
      label: null,
      type:  null,
      value: null,
      data: null,
      extra: null
    }
    this.popupOption.add = true;
  }
  startAddQuestion() {
    this.tmps.question = {
      code: null,
      label: null,
      type: null,
      subType: null
    }
    this.popupQuestion.add = true;
  }
  startAddLogic() {
    this.tmps.logic = {
      action: null,
      targetId: this.selected.logic.target.id
    }
    this.popupLogic.add = true;
  }

  // QUESTIONARIES
  startCreateQuest() {
    let dialogRef = this.dialog.open(QuestionaryCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.questionaries.push(result)
      }
    });
  }

  startEditQuest(q:Questionary):void {
    this.router.navigate(['/questionaries/'+q.id+'/edit']);
    //this.selected.quest = q;
    //this.tmps.quest = {
      //code: q.code,
      //label: q.label.data 
    //};
  }
  startEditLogic(o:Logic): void {
    this.selected.logic.logic = o;
    this.tmps.logic = {
      bool: null,
      operator: null,
      target: null,
      option: null,
      group: null
    };
    this.selected.forLogic = {
      operator: null,
      group: null,
      target: null,
      option: null
    };
    if (this.selected.logic.logic.hierarchy == null) {
      this.qService.getLogicHierarchy(o.id)
      .then(h => {
        this.selected.logic.logic.hierarchy = h; 
        console.log(h);
      })
    }
    this.popupLogic.edit = true;
  }

  startManagerLogic(e: E ) : void {
    this.selected.logic.target = e;
    this.qService.getLogicsInElement(e.id)
      .then(ls => { this.selected.logic.target.logics = ls; console.log(ls);});
    this.popupLogic.manager = true;
  }

  startEditGroup(g: Group): void {
    this.selected.group = g;
    this.tmps.group = {
    }
    this.getQuestionsByGroup(g);
    this.popupGroup.edit = true;
  }

  startEditQuestion(q: Question): void {
    this.selected.question = q;
    if (q.options == null) {
      this.qService.getOptionsInQuestion(q.id)
      .then(os => {
        q.options = os;
      });
    }
    this.popupQuestion.edit = true;
  }
  startAddGroup() {
    if (this.selected.quest != null) {
      this.tmps.group = {
        code: null,
        label: null
      };
      this.popupGroup.add = true;
    }
  }
  takeQuestionary(q: Questionary): void {
    if (q != null) {
      this.tqService.takeQuestionary(q)
      .then (tq => {
        this.takenQuizzes.push(tq);
      });
    }
  }

  continueTakenQuiz(tq: TakenQuiz): void {
    if (tq!= null) {
      this.router.navigate(['/take/'+tq.id]);
    }
  }
  //takeQuestionary(q:Questionary): void {
    //if (tq == null) {
      //var tq = new TakenQuiz();
      //tq.questionary_id = q.uid;
      //this.qService.addTakenQuiz(tq)
        //.then(tt => {
          //tq = tt;
          //this.router.navigate(['/take/'+tq.uid]);
        //});
    //} else {
      //this.router.navigate(['/take/'+tq.uid]);
    //}
    
  //}
  seeHistory(tq:TakenQuiz) : void {
    this.router.navigate(['/history/'+tq.id]);
  }
  //actionQuestionary(q: Questionary):void {
    //this.router.navigate(['/questionaries/'+q.uid]);
  //}
  //logout (): void {
  //}
  //
 
  questCreateHandler(q) {
    if (q.data != null) {
      this.questionaries.push(q.data);
    }
    if(q.action == "hide") {
      this.popupQuest.add  = false;
    }
  }

  addGroup(): void {
    this.popupGroup.add = false;
    var tmpQ = this.selected.quest;
    this.qService.addGroupInQuest( {questId: tmpQ.id, code: this.tmps.group.code, label: this.tmps.group.label})
      .then (g => {
        tmpQ.groups.push(g);
      });
  }
  addQuestion(): void {
    this.popupQuestion.add = false;
    var q = this.tmps.question;
    this.qService.addQuestionInGroup({groupId: this.selected.group.id, label: q.label, code: q.code, type: q.type.code, sub_type: q.subType.code })
    .then (q => {
      this.selected.group.questions.push(q);
    });
  }
  addOption(): void {
    this.popupOption.add = false;
    var q = this.tmps.option;
    var tq = this.selected.question;
    this.qService.addOptionInQuestion({questionId: tq.id, label: q.label, type: q.type, value: q.value})
    .then (q => {
      tq.options.push(q);
      console.log(q);
    });
  }
  addLogic(): void {
    this.popupLogic.add = false;
    this.qService.addLogicInElement({targetId: this.selected.logic.target.id, action: this.tmps.logic.action})
    .then(l => {
      if (this.selected.logic.target.logics != null) {
        this.selected.logic.target.logics.push(l);
      }
    });
  }
  addMatchLogic() {
    if (this.selected.matchLogic.target != null) {
      this.qService.addMatchLogic({parentId: this.selected.matchLogic.target.id, bool: this.tmps.logic.bool })
      .then(ml => {
        if (this.selected.matchLogic.target.children === undefined){
          this.selected.matchLogic.target.children = new Array();
        } 
        this.selected.matchLogic.target.children.push({id: ml.id, type: 'match-logic', bool: ml.bool });
      });
    }
  }
  
  addMatch() {
    if (this.selected.matchLogic.target != null) {
      this.qService.addMatch({parentId: this.selected.matchLogic.target.id, operator: this.tmps.logic.operator.code, target_id: this.selected.forLogic.target.id, target_option_id: this.selected.forLogic.option.id })
      .then(ml => {
        if (this.selected.matchLogic.target.children === undefined){
          this.selected.matchLogic.target.children = new Array();
        } 
        this.selected.matchLogic.target.children.push({id: ml.id, type: 'match', operator: ml.operator});
      });
    }
  }

  cancelPopupOption(): void {
    this.popupOption.add = false;
    this.popupOption.edit = false;
  }
  cancelPopupQuestion():void {
    this.popupQuestion.add = false;
    this.popupQuestion.edit = false;
  }
  cancelPopupQuest():void {
    this.popupQuest.add = false;
    this.popupQuest.edit = false;
  }
  cancelPopupGroup():void {
    this.popupGroup.add = false;
    this.popupGroup.edit = false;
  }
  cancelPopupLogic(m:boolean):void {
    if (m){
      this.popupLogic.manager = false;
    }
    else {
      this.popupLogic.edit = false;
      this.popupLogic.add = false;
    }
  }

  addQuestionary(): void {
    this.popupQuest.add = false;
    this.qService.addQuestionary({label: this.tmps.quest.label, code: this.tmps.quest.code })
    .then (q => {
      this.questionaries.push(q);
    });
  }
  //editQuestionary(q): void {
    //this.tmp.id = this.questionary.id;
    //this.tmp.code = this.questionary.code;
    //this.showEditing = true;
  //}

  deleteQuestionary(q: Questionary): void {
    this.qService.deleteQuestionary(q)
    .then(res => {
      if(res == true) {
        this.questionaries.splice(this.questionaries.indexOf(q), 1);
      }
    });
  }
  deleteTakenQuiz(t: TakenQuiz): void {
    this.tqService.delete(t)
    .then(res => {
      if(res == true) {
        this.takenQuizzes.splice(this.takenQuizzes.indexOf(t), 1);
      }
    });
  }

  deleteLogic(o:Logic): void {
    console.log(o);
    this.qService.deleteLogic(o.id)
    .then(res => {
      if (res) {
        this.selected.logic.target.logics.splice(this.selected.logic.target.logics.indexOf(o), 1);
      }
    });
  }

  deleteGroup(g: Group): void {
    this.qService.deleteGroup(g)
    .then(res => {
      if (res == true) {
        this.selected.quest.groups.splice(this.selected.quest.groups.indexOf(g), 1);
      }
    });
  }
  deleteQuestion(g: Question): void {
    this.qService.deleteQuestion(g)
    .then(res => {
      if (res == true) {
        this.selected.group.questions.splice(this.selected.group.questions.indexOf(g), 1);
      }
    });
  }


  getQuestionsByGroup(g: Group) {
    if (g.questions == null) {
      this.qService.getQuestionsByGroup(g.id)
      .then(qs => {
        if (g.questions == null) {
          g.questions = [];
        }
        g.questions = qs;
      });
    } else {
      if (g.questions.length == 0) {
        this.qService.getQuestionsByGroup(g.id)
        .then(qs => {
          if (g.questions == null) {
            g.questions = [];
          }
          g.questions = qs;
        });
      }
    }
  }

  forLogicSelectedGroup() {
    console.log("Loading questions for group");
    this.getQuestionsByGroup(this.selected.forLogic.group);
  }

  forLogicSelectedTarget() {
    console.log("Loading options for target");
    if (this.selected.forLogic.target.options == null) {
      this.qService.getOptionsInQuestion(this.selected.forLogic.target.id)
      .then(os => {
        this.selected.forLogic.target.options = os;
      });
    } else {
      if (this.selected.forLogic.target.options.length == 0 ) {
        this.qService.getOptionsInQuestion(this.selected.forLogic.target.id)
        .then(os => {
          this.selected.forLogic.target.options = os;
        });
      }
    }
  }

  handleSelectedNode(d:any) {
    console.log("something has changed");
    this.selected.matchLogic.target = d;
    console.log(d);
  }

  cancel() : void {
    this.popupQuest.add = false;
    this.popupQuest.edit = false;
    this.popupGroup.add = false;
    this.popupGroup.edit = false;
  }
  createMach(): void  {
    console.log(this.selected.forLogic);
    console.log(this.tmps.logic)
  }
}

