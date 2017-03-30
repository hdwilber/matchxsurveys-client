import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session} from "../../user/common/types";
import {E, Question, Option, Group, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class LogicService{
    session: Session;
    restService: RestService;
    user: User;
  
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

    getById(id: number): Promise<Logic> {
      return this.http.get(this.restService.getServerPath() + '/logics/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Logic;
          })
          .catch(err => { 
            console.log ("Getting Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    appendMatch(id: number, d: any) : Promise<Match> {
      return this.http.post(this.restService.getServerPath() + '/match-logics/'+id+'/matchs', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Match;
          })
          .catch(err => { 
            console.log ("Appending Match failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    appendMatchLogic(id: number, d: any) : Promise<MatchLogic> {
      return this.http.post(this.restService.getServerPath() + '/elements/'+id+'/match-logics', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as MatchLogic;
          })
          .catch(err => { 
            console.log ("Appending MatchLogic failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    appendIn(id:number, d: any) : Promise<Logic> {
      return this.http.post(this.restService.getServerPath() + '/elements/'+id+'/logics', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Logic;
          })
          .catch(err => { 
            console.log ("Create Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    deleteMatchLogic(e: any): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/match-logics/'+e.id, {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          if (aux.status == "ok") {
            return true as boolean;
          }
        })
        .catch(err => {
          console.log ("Delete Match Logic failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });
    }
    delete(l: Logic): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/logics/'+l.id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            if (aux.status == "ok") {
              return true as boolean;
            }
          })
          .catch(err => { 
            console.log ("Delete Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
}
