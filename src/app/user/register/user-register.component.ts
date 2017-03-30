import { Component, OnInit} from "@angular/core";
import { Location } from '@angular/common';
import {Router} from '@angular/router';

import { UserService } from "../common/user.service";
import { Session, User} from "../common/types";

@Component ({
  moduleId: module.id,
  selector: "user-register",
  templateUrl: "./user-register.component.html"
})

export class UserRegisterComponent implements OnInit {
  user:User= new User();
  userService: UserService;
  router: Router;
  
    constructor (userService: UserService,
        router: Router) {
        this.userService = userService;
        this.router = router;
    }

  register () :void {
    this.user.type = "admin";
    this.user.confirmed = true;
      this.userService.register (this.user).then ( u => {
          this.user.password = "";
          if (u.email == this.user.email) {
            alert("The user " + this.user.email + " has been created");
            this.router.navigate(['/home']);
          }
        }
        );
  }

  ngOnInit(): void {
    this.user.password = "";
  }

}
