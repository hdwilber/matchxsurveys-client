import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Router } from "@angular/router";
import { Session, User } from "../user/common/types"
import { UserService } from "../user/common/user.service";

@Component({
  moduleId: module.id,
  selector: 'mef-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor (private router: Router, userService: UserService) {
  }
}

