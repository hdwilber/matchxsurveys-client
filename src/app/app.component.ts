import { Component, OnInit, SimpleChange } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "./user/common/types"
import { UserService } from "./user/common/user.service";
import { QuestionaryService } from "./questionary/common/questionary.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (private router: Router, userService: UserService) {
  }
  ngOnInit():void  {
  }
  ngOnChanges(a: SimpleChange): void {
  }
}
