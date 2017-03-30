import { Component, OnInit} from "@angular/core";
import { User, Session} from "../common/types";
import { Router } from "@angular/router";
import { Headers, Response, Http } from "@angular/http";

import { UserService } from "../common/user.service";
import { RestService } from "../../common/rest.service";

@Component ({
  moduleId: module.id,
  selector: "user-login",
  templateUrl: "./user-login.component.html"
})

export class UserLoginComponent implements OnInit {
    user:User = new User();
    userService: UserService;
    router: Router;

    constructor ( router: Router, userService: UserService) {
        this.router = router;
        this.userService = userService;
    }

    login (): void {
      this.userService.login (
          this.user.email, this.user.password
        ).then ( session => {
        this.user.email = "";
        this.user.password = "";
        if (session != null) {
          this.router.navigate(['/dashboard']);
        }
      });
    }

  ngOnInit(): void {
    this.user.email = "";
    this.user.password = "";
  }

}
