import { Input, Output, Component, OnInit, SimpleChange, EventEmitter } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/user"
import { UserService } from "./../user/user.service";
import { QuestionaryService } from "./questionary.service";
import { SelectionData, Selection, Question, Questionary, Option, Step } from "./types";

@Component({
  moduleId: module.id,
  selector: 'step-action',
  templateUrl: './step-action.component.html'
})
export class StepActionComponent implements OnInit {
  @Input() step: Step;
  @Input() question: Question;
  @Output() chosenData = new EventEmitter();

  session: Session;
  userService: UserService;
  qService: QuestionaryService;
  data: SelectionData;

  constructor (private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
  }
  ngOnInit():void  {
  }
  ngOnChanges(changes:SimpleChange):void {
    console.log(changes);
    if (changes['question'] != undefined) {
      console.log(changes['question'].currentValue);
      this.data = new SelectionData();
      this.data.question_id = this.question.uid;
    }
  }

  prepareData(o) {
    if (o == null) {
      console.log(this.data);
    } else {
      this.data.option_id = o.uid; 
    }
    this.sendSelection(this.data);
  }

  sendSelection(o:SelectionData) {
    this.chosenData.emit(o);
  }

  addQuestion(): void {
    this.router.navigate(['/steps/'+this.step.uid+ '/questions/add']);
  }

  getMaxLevel(): number{
    return (this.question.options[0].value > this.question.options[1].value)?this.question.options[0].value : this.question.options[1].value;
  }
  getMinLevel(): number {
    return (this.question.options[0].value < this.question.options[1].value)?this.question.options[0].value : this.question.options[1].value;
  }

  getArrayLevel(): number[] {
    var ret = [];
    for(var i =this.getMinLevel(); i <= this.getMaxLevel(); i++ ) {
      ret.push(i);
    }
    return ret;
  }
  

}

