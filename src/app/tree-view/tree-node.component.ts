import { Output, Input, Component, OnInit, SimpleChange, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Session, User } from "./../user/common/types"
import { UserService } from "./../user/common/user.service";
import { QuestionaryService } from "./../questionary/common/questionary.service";
import { TreeNode } from "./types";

@Component({
  moduleId: module.id,
  selector: 'tree-node',
  templateUrl: './tree-node.component.html'
})
export class TreeNodeComponent implements OnInit {
  @Input() node: any;
  @Input() currentNode: any;
  @Output() selectedNode = new EventEmitter();

  constructor (private _location: Location, private route: ActivatedRoute, private router: Router, userService: UserService, questionService:QuestionaryService) {
  }
  ngOnInit():void  {
  }

  ngOnChanges(changes: SimpleChange) :void {
    if (this.node.expanded === undefined) {
      this.node.expanded = true;
    }
    if (this.node.checked === undefined) {
      this.node.checked = true;
    }
  }
  toggleExpand(n: any):void {
    n.expanded = !n.expanded;
    this.toggleExpandRecursive(n, n.expanded);
  }
  functionde(n) {
    this.selectedNode.emit(n);
  }

  hasChildren(n: any):boolean {
    if (this.node.children != null) {
      if (this.node.children.length > 0) {
        return true;
      }
    }
    return false;
  }

  toggleExpandRecursive(n:any, state:boolean):void {
    if (n.children != null) {
      n.children.forEach( c => {
        c.expanded = state;
        this.toggleExpandRecursive(c, state);
      });
    }
  }
  select(n: any):void {
    this.selectedNode.emit(n);
  }
  getChecked(n: any):boolean {
    return n.checked;
  }
  printCurrent() {
    console.log(this.currentNode);
  }

  checkChildren(): boolean {
    //return (this.expanded && this.children != null);
    return false;
  }
  appendMatch(n: any) {
  }
  appendMatchLogic(n: any) {
  }
}

