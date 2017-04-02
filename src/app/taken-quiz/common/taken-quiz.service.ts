import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session} from "../../user/common/types";
import {E, Answer, Question, Option, Group, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "../../questionary/common/types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class TakenQuizService {
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
    getById(id: number): Promise<TakenQuiz> {
      return this.http.get(this.restService.getServerPath() + '/taken-quizzes/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as TakenQuiz
          })
          .catch(err => { 
            console.log ("Getting TakenQuiz failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    getHistory(id: number): Promise<TakenQuiz> {
      return this.http.get(this.restService.getServerPath() + '/taken-quizzes/'+id+'/history',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as TakenQuiz
          })
          .catch(err => { 
            console.log ("Getting TakenQuiz failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    takeQuestionary(q: Questionary): Promise<TakenQuiz> {
      return this.http.get(this.restService.getServerPath() + '/questionaries/'+q.id+'/take', {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as TakenQuiz;
          })
          .catch(err => { 
            console.log ("Retrieving Taken Quizzes failed");
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    getMetadata(id:number) {
      return this.http.get(this.restService.getServerPath() + '/taken-quizzes/' + id +  '/metadata', {headers: this.restService.createHeaders()})
        .toPromise()
        .then (res => {
          var aux = res.json();
          return aux.data as any;
        })
        .catch(err => {
            console.log ("TakenQuiz: Metadata failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
        });

    }
    nextQuestion(id:number, ans: any): Promise<any> {
      return this.http.post(this.restService.getServerPath() + '/taken-quizzes/' + id +  '/answers', JSON.stringify(ans == null ? {} : ans), {headers: this.restService.createHeaders()})
        .toPromise()
        .then (res => {
          var aux = res.json();
          return aux.data as any;
        })
        .catch(err => {
            console.log ("TakenQuiz: NextQuestion failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
        });
    }
    delete(d: TakenQuiz): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/taken-quizzes/'+d.id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            if (aux.status == "ok") {
              return true as boolean;
            }
          })
          .catch(err => { 
            console.log ("Delete TakenQuiz failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
}
