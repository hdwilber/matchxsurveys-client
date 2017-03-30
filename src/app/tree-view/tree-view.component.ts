import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/user"
import { UserService } from "./../user/user.service";
import { QuestionaryService } from "./../questionary/questionary.service";
import { TreeNode } from "./types";
import { Logic, Match, MatchLogic } from "./../questionary/types";

@Component({
  moduleId: module.id,
  selector: 'tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit {
  session: Session;
  userService: UserService;
  qService: QuestionaryService;
  @Input() root: TreeNode;
  currentNode:TreeNode;
  newMLogic: MatchLogic = null;
  newMatch: Match = null;
  newType: string = "";
  @Output() selectedNode = new EventEmitter();

  constructor (private _location: Location, private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
    this.userService = userService;
    this.session = userService.session;
    this.qService = questionService;
    this.newMLogic = new MatchLogic();
    this.newMatch = new Match();
  }

  ngOnInit():void  {
  }
  handleSelectedNode(n: TreeNode) {
    this.currentNode = n;
    this.selectedNode.emit(n);
  }
  appendMatch(n: TreeNode) {
  }
  appendMatchLogic(n: TreeNode) {
  }
}

