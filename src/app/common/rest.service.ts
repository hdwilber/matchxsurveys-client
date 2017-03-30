import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";

import "rxjs/add/operator/toPromise";
import { User, Session} from "../user/common/types";
import { CoolLocalStorage } from "angular2-cool-storage";

import { UserService } from "../user/common/user.service";

@Injectable()
export class RestService {

    //server: string = "http://maxsurvey-hdwilber.rhcloud.com";
    server: string = "http://localhost:8080";
    //server: string = "https://matchxsurveys.com";
    session: Session;
    authCode = "Bearer";
    path: string = "/api";

    constructor() {
    }
    setSession(session: Session) {
      this.session = session;
    }

    createHeaders(): Headers  {
      if (this.session != null && this.session !== undefined) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authCode + " " + this.session.token);
        headers.append('If-Match' , "asdfalksdjfalksdjfa");
        //console.log ('Authorization -- ' + this.authCode + " " + this.session.token);
        return headers;
      }
      else {
        return null;
      }
    }
    public getServerPath() {
      return this.server + this.path;
    }
}

