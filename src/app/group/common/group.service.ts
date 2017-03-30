import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session} from "../../user/common/types";
import {E, Question, Option, Group, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class GroupService {
    session: Session;
    restService: RestService;
    user: User;
    questions: Question[];
  
    constructor (private router: Router, private http:Http, restService: RestService, private userService: UserService) {
        this.session = userService.session;
        this.restService = restService;
    }


    checkUnauthorized(err) {
      if (err.status == 401) {
        this.userService.logout();
        this.router.navigate(['/login']);
      }
      return err;
    }
    getById(id: number): Promise<Group> {
      return this.http.get(this.restService.getServerPath() + '/groups/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Group;
          })
          .catch(err => { 
            console.log ("Getting Group failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    appendIn(id:number, d: Group) : Promise<Group> {
      return this.http.post(this.restService.getServerPath() + '/questionaries/'+id+'/groups/append', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Group;
          })
          .catch(err => { 
            console.log ("Create Group failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    delete(d: Group): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/groups/'+d.id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            if (aux.status == "ok") {
              return true as boolean;
            }
          })
          .catch(err => { 
            console.log ("Delete Questionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
}
