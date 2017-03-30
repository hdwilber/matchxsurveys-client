import { SimpleChange, Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../user/common/types"
import { UserService } from "../user/common/user.service";

import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'mef-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  session: Session;
  user: User;
  logout= new EventEmitter();
  loginSub: Subscription;
  logoutSub: Subscription;

  constructor (private router: Router, private userService: UserService) {
    this.userService = userService;
    this.session = this.userService.session;
    this.loginSub = this.userService.whenLogin().subscribe(s => {
      this.session = s;
    });
    this.logoutSub = this.userService.whenLogout().subscribe(s => {
      this.session = null;
    });
  }

  ngOnInit():void  {
  }

  ngOnChanges(change: SimpleChange): void {
    console.log(change);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.loginSub.unsubscribe();
    this.logoutSub.unsubscribe();
  }

  logoutFnc (): void {
    this.userService.logout();
  }
}

