import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session} from "../../user/common/types";
import {E, Question, Option, Group, Questionary, TakenQuiz, Logic, MatchLogic, Match} from "./types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class QuestionaryService {
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
    create(d: any) : Promise<Questionary> {
      return this.http.post(this.restService.getServerPath() + '/questionaries', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Questionary;
          })
          .catch(err => { 
            console.log ("Create Questionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    delete(d: Questionary): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/questionaries/'+d.id,
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

    getQuestionsByGroup(gid: number): Promise<Question[]> {
      return this.http.get(this.restService.getServerPath() + '/groups/'+gid+"/questions",
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Question[];
          })
          .catch(err => { 
            console.log ("Retrieving questionaries failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    getQuestionaries(): Promise<Questionary[]> {
      return this.http.get(this.restService.getServerPath() + '/questionaries',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Questionary[];
          })
          .catch(err => { 
            console.log ("Retrieving questionaries failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    getById(id:number): Promise<Questionary> {
      return this.http.get(this.restService.getServerPath() + '/questionaries/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Questionary;
          })
          .catch(err => { 
            console.log ("Retrieving quetionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    getQuestionary(id:string): Promise<Questionary> {
      return this.http.get(this.restService.getServerPath() + '/questionaries/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Questionary;
          })
          .catch(err => { 
            console.log ("Retrieving quetionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    editQuestionary(d: Object): Promise<Questionary> {
      return this.http.patch(this.restService.getServerPath() + '/questionaries', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Questionary;
          })
          .catch(err => { 
            console.log ("Editing Questionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    addQuestionInGroup(d: any) : Promise<Question> {
      return this.http.post(this.restService.getServerPath() + '/groups/'+d.groupId+'/questions/append', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Question;
          })
          .catch(err => { 
            console.log ("Adding Questionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    addQuestionary(d: any) : Promise<Questionary> {
      return this.http.post(this.restService.getServerPath() + '/questionaries', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Questionary;
          })
          .catch(err => { 
            console.log ("Adding Questionary failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    addOptionInQuestion(d: any) : Promise<Option> {
      return this.http.post(this.restService.getServerPath() + '/questions/'+d.questionId+'/options/append', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Option;
          })
          .catch(err => { 
            console.log ("Adding Option failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    
    getOptionsInQuestion(qid: number): Promise<Option[]> {
      return this.http.get(this.restService.getServerPath() + '/questions/'+qid+"/options",
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Option[];
          })
          .catch(err => { 
            console.log ("Retrieving questionaries failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    
    deleteQuestion(d: Question): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/questions/'+d.id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            if (aux.status == "ok") {
              return true as boolean;
            }
          })
          .catch(err => { 
            console.log ("Delete Question failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    deleteLogic(id:number): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/logics/'+id,
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
    deleteGroup(d: Group): Promise<boolean> {
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
            console.log ("Delete Group failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    deleteQuestionary(d: Questionary): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/questionaries/'+d.id,
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

    addMatch(d: any) : Promise<Match> {
      console.log(d);
      return this.http.post(this.restService.getServerPath() + '/match-logics/'+d.parentId+'/matchs', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Match;
          })
          .catch(err => { 
            console.log ("Adding Match failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    addMatchLogic(d: any) : Promise<MatchLogic> {
      return this.http.post(this.restService.getServerPath() + '/elements/'+d.parentId+'/match-logics', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as MatchLogic;
          })
          .catch(err => { 
            console.log ("Adding MatchLogic failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    addGroupInQuest(d: any) : Promise<Group> {
      return this.http.post(this.restService.getServerPath() + '/questionaries/'+d.questId+'/groups/append', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Group;
          })
          .catch(err => { 
            console.log ("Adding Group failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    getTakenQuizzes(): Promise<TakenQuiz[]> {
      return this.http.get(this.restService.getServerPath() + '/taken-quizzes',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as TakenQuiz[];
          })
          .catch(err => { 
            console.log ("Retrieving taken quizzes failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }

    getLogicsInQuestion(id): Promise<Logic[]> {
      return this.http.get(this.restService.getServerPath() + '/questions/'+id+'/logics',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Logic[];
          })
          .catch(err => { 
            console.log ("Retrieving Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    getLogicHierarchy(id): Promise<any> {
      return this.http.get(this.restService.getServerPath() + '/logics/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as any;
          })
          .catch(err => { 
            console.log ("Retrieving Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }

    getLogicsInElement(id): Promise<Logic[]> {
      return this.http.get(this.restService.getServerPath() + '/elements/'+id+'/logics',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux.data as Logic[];
          })
          .catch(err => { 
            console.log ("Retrieving Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    addLogicInElement(d:any): Promise<Logic> {
      return this.http.post(this.restService.getServerPath() + '/elements/'+d.targetId+'/logics', JSON.stringify(d), {headers: this.restService.createHeaders()})
          .toPromise()
          .then(res => {
            var aux = res.json();
            return aux.data as Logic;
          })
          .catch(err => { 
            console.log ("Adding Logic failed");
            this.checkUnauthorized(err);
            console.log(err);
            return Promise.resolve();
          });
    }
    //addTakenQuiz(tq: TakenQuiz): Promise<TakenQuiz> {
      //return this.http.post(this.restService.getServerPath() + '/taken-quizzes',
                           //JSON.stringify(tq), {headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as TakenQuiz;
          //})
          //.catch(err => { 
            //console.log ("Retrieving Taken Quizzes failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}

    //addSelection(s: Selection): Promise<Selection> {
      //return this.http.post(this.restService.getServerPath() + '/taken-quizzes/'+s.taken_quiz_id + '/selections',
                            //JSON.stringify(s),
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Selection;
          //})
          //.catch(err => { 
            //console.log ("Retrieving Taken Quiz failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}
    //getSelections(tq: TakenQuiz): Promise<Selection[]> {
      //return this.http.get(this.restService.getServerPath() + '/taken-quizzes/'+tq.uid+ '/selections',
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Selection[];
          //})
          //.catch(err => { 
            //console.log ("Retrieving Selections form Taken Quiz failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}

    //getTakenQuiz(uid:string): Promise<TakenQuiz> {
      //return this.http.get(this.restService.getServerPath() + '/taken-quizzes/'+uid,
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as TakenQuiz;
          //})
          //.catch(err => { 
            //console.log ("Retrieving Taken Quiz failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}
    //getTakenQuizzes(): Promise<TakenQuiz[]> {
      //return this.http.get(this.restService.getServerPath() + '/taken-quizzes',
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as TakenQuiz[];
          //})
          //.catch(err => { 
            //console.log ("Retrieving Taken Quizzes failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}
    //getQuestionaries(): Promise<Questionary[]> {
      //return this.http.get(this.restService.getServerPath() + '/questionaries',
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Questionary[];
          //})
          //.catch(err => { 
            //console.log ("Retrieving questionaries failed");
            //console.log(err);
            //this.checkUnauthorized(err);
            //return Promise.resolve();
          //});
    //}
    //editQuestionary(d: Object): Promise<Questionary> {
      //return this.http.patch(this.restService.getServerPath() + '/questionaries', JSON.stringify(d),
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Questionary;
          //})
          //.catch(err => { 
            //console.log ("Editing Questionary failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}
    //addQuestionary(d: Object) : Promise<Questionary> {
      //return this.http.post(this.restService.getServerPath() + '/questionaries', JSON.stringify(d),
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Questionary;
          //})
          //.catch(err => { 
            //console.log ("Adding Questionary failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
          //});
    //}

    //getSteps(quid): Promise<Step[]> {
      //return this.http.get(this.restService.getServerPath() + '/questionaries/'+quid+'/steps',
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Step[];
          //})
          //.catch(this.getStepsErr);
    //}

    //addStep(s: Step): Promise<Step>{
      //return this.http.post(this.restService.getServerPath() + '/questionaries/'+s.questionary_id+'/steps',
             //JSON.stringify(s), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Step;
               //}
             //})
             //.catch(err => {
                //console.log ("Adding Step to Quetionary failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}

    //getLogic(uid: string): Promise<Logic> {
      //return this.http.get(this.restService.getServerPath() + '/logics/'+ uid, {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Logic;
               //}
             //})
             //.catch(err => {
                //console.log ("Getting Logic failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    //addLogicFromStep(uid: string, l:Logic): Promise<Logic> {
      //return this.http.post(this.restService.getServerPath() + '/steps/' + uid+ '/logics',
             //JSON.stringify(l), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Logic;
               //}
             //})
             //.catch(err => {
                //console.log ("Getting Logics for Step failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    //getLogicsFromStep(s:Step): Promise<Logic[]> {
      //return this.http.get(this.restService.getServerPath() + '/steps/'+s.uid+'/logics', {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Logic[];
               //}
             //})
             //.catch(err => {
                //console.log ("Getting Logics for Step failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    //getLogics(q:Question): Promise<Logic[]> {
      //return this.http.get(this.restService.getServerPath() + '/questions/'+q.uid+'/logics', {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Logic[];
               //}
             //})
             //.catch(err => {
                //console.log ("Getting Logics for Question failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}

    //getLogicHierarcy(logic: Logic) : Promise<JsonLogic> {
      //return this.http.get(this.restService.getServerPath() + '/logics/'+ logic.uid+'/hierarchy', {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.logic as JsonLogic;
               //}
             //})
             //.catch(err => {
                //console.log ("Getting Logic Hierarchy failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});

    //}

    //addMatchLogic(ml:MatchLogic): Promise<MatchLogic> {
      //return this.http.post(this.restService.getServerPath() + '/match-logics', JSON.stringify(ml), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as MatchLogic;
               //}
             //})
             //.catch(err => {
                //console.log ("Saving MatchLogic failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});

    //}
    //getMatchLogic(uid: string) : Promise<MatchLogic> {
      //return this.http.get(this.restService.getServerPath() + '/match-logics/'+ uid, {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as MatchLogic;
               //}
             //})
             //.catch(err => {
                //console.log ("Getting MatchLogic failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});

    //}

    //removeLogic(l:Logic) : Promise<boolean> {
      //return this.http.delete(this.restService.getServerPath() + '/logics/'+l.uid, {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return (aux != null);
               //}
             //})
             //.catch(err => {
                //console.log ("Adding Match to Question failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    //removeMatchLogic(uid: string): Promise<boolean>{
      //return this.http.delete(this.restService.getServerPath() + '/match-logics/'+uid,
             //{headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Match;
               //}
             //})
             //.catch(err => {
                //console.log ("Adding Match to Question failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    
    //addMatchToMatchLogic(ml: string, m: Match): Promise<Match>{
      //return this.http.post(this.restService.getServerPath() + '/match-logics/'+ml+'/matchs',
             //JSON.stringify(m), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Match;
               //}
             //})
             //.catch(err => {
                //console.log ("Adding Match to Question failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    //addMatch(m: Match): Promise<Match>{
      //return this.http.post(this.restService.getServerPath() + '/questions/'+m.question_id+'/matchs',
             //JSON.stringify(m), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Match;
               //}
             //})
             //.catch(err => {
                //console.log ("Adding Match to Question failed");
                //console.log(err);
                //if (err.status == 401) {
                //}
                //return Promise.resolve();
             //});
    //}
    //addQuestion(q: Question): Promise<Question>{
      //return this.http.post(this.restService.getServerPath() + '/steps/' + q.step_id+ '/questions',
             //JSON.stringify(q), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Question;
               //}
             //})
             //.catch(this.addQuestionErr);
    //}
    //addOption(o: Option): Promise<Option>{
      //return this.http.post(this.restService.getServerPath() + '/questions/' + o.question_id+ '/options',
             //JSON.stringify(o), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Option;
               //}
             //})
             //.catch(this.addOptionErr);
    //}
    //addLogic(questionId:string, l: Logic): Promise<Logic>{
      //return this.http.post(this.restService.getServerPath() + '/questions/' + questionId+ '/logics',
             //JSON.stringify(l), {headers: this.restService.createHeaders()} )
             //.toPromise()
             //.then( res => {
               //if (res.status == 200 || res.status == 201) {
                 //var aux = res.json();
                 //return aux.data as Logic;
               //}
             //})
             //.catch(this.addLogicErr);
    //}

    //getStep(suid: string): Promise<Step> {
      //return this.http.get(this.restService.getServerPath() + '/steps/' + suid, {headers: this.restService.createHeaders()})
        //.toPromise()
        //.then(res => {
            //var aux = res.json();
            //return aux.data as Step;
        //})
        //.catch(this.getStepErr);
    //}

    //getNextQuestion(tq: TakenQuiz, s: Selection): Promise<any>{
      //var url = this.restService.getServerPath() + '/taken-quizzes/'+tq.uid+ '/selections';
      //if (s == null) {
        //s = new Selection();
        //delete(s.uid);
      //}
      //return this.http.post(url, JSON.stringify(s), {headers: this.restService.createHeaders()})
        //.toPromise() 
        //.then(res => {
          //var aux = res.json()
          //return aux as any;
        //})
        //.catch(err => {  
            //console.log ("Could not get next Question ");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
        //});
    //}

    //getQuestion(quid: string): Promise<Question> {
      //var url = this.restService.getServerPath() + '/questions/' + quid;
      //return this.http.get(url, {headers: this.restService.createHeaders()})
        //.toPromise()
        //.then(res => {
            //var aux = res.json();
            //return aux.data as Question;
        //})
        //.catch(err => {  
            //console.log ("Retriving Question from Step failed");
            //console.log(err);
            //if (err.status == 401) {
            //}
            //return Promise.resolve();
        //});
    //}

    //getQuestions(suid: string): Promise<Question[]> {
      //return this.http.get(this.restService.getServerPath() + '/steps/'+suid +'/questions',
                           //{headers: this.restService.createHeaders()})
          //.toPromise()
          //.then( res => {
            //var aux = res.json();
            //return aux.data as Question[];
          //})
          //.catch(this.getQuestionsErr);
    //}
    //addLogicErr(error: any) : Promise<any> {
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //addOptionErr(error: any) : Promise<any> {
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //addQuestionErr(error: any) : Promise<any> {
        //console.log ("Get Single Question Error");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //addQuestionsErr(error: any) : Promise<any> {
        //console.log ("Add Step ERROR");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //addStepErr(error: any) : Promise<any> {
        //console.log ("Add Step ERROR");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //getQuestionErr(error: any) : Promise<any> {
        //console.log ("Get Singl eQuestion ERROR");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //getStepErr(error: any) : Promise<any> {
        //console.log ("Get Singl Step ERROR");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}

    //getQuestionsErr(error: any) : Promise<any> {
        //console.log ("Get Questions ERROR");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}
    //getStepsErr(error: any) : Promise<any> {
        //console.log ("Get Steps ERROR");
        //if (error.status == 401) {
        //}
        //return Promise.resolve();
    //}

}
