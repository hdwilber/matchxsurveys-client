import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

import { CoolStorageModule, CoolLocalStorage } from "angular2-cool-storage";

import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';

//Angular material
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';


//Services 
import { UserService } from "./user/common/user.service";
import { RestService } from "./common/rest.service";
import { QuestionaryService } from "./questionary/common/questionary.service";
import { GroupService } from "./group/common/group.service";

// Componenets
import { UserLoginComponent }  from './user/login/user-login.component';
import { UserRegisterComponent }  from './user/register/user-register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { QuestionaryCreateComponent } from './questionary/create/questionary-create.component';
import { QuestionaryEditComponent } from './questionary/edit/questionary-edit.component';

import { GroupCreateComponent  } from './group/create/group-create.component';
import { GroupEditComponent } from './group/edit/group-edit.component';
import { LogicService } from './logic/common/logic.service';

//import { QuestionaryActionComponent } from './questionary/questionary-action.component';

//import { StepAddComponent } from './questionary/step-add.component';
//import { StepActionComponent } from './questionary/step-action.component';
//import { StepEditComponent } from './questionary/step-edit.component';

import { QuestionCreateComponent }  from './question/create/question-create.component';
import { QuestionService }  from './question/common/question.service';

import { QuestionEditComponent }  from './question/edit/question-edit.component';
import { TakenQuizService }  from './taken-quiz/common/taken-quiz.service';

import { OptionService }  from './option/common/option.service';

import { OptionCreateComponent } from './option/create/option-create.component';

import { LogicCreateComponent } from './logic/create/logic-create.component';
import { LogicEditComponent } from './logic/edit/logic-edit.component';
import { MatchLogicCreateComponent } from './logic/match-logic/match-logic-create.component';
import { MatchCreateComponent } from './logic/match/match-create.component';


import { TakenQuizActionComponent } from './taken-quiz/action/taken-quiz-action.component';

import { TakenQuizHistoryComponent } from './taken-quiz/history/taken-quiz-history.component';


//import { LogicEditComponent } from './questionary/logic-edit.component';
//import { MatchsEditorComponent } from './questionary/matchs-editor.component';

import { TreeViewComponent } from "./tree-view/tree-view.component";
import { TreeNodeComponent } from "./tree-view/tree-node.component";

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HeaderComponent,
    HomeComponent, 
    DashboardComponent,

    QuestionaryCreateComponent,
    QuestionaryEditComponent,

    GroupCreateComponent, 
    GroupEditComponent,

    QuestionCreateComponent,
    QuestionEditComponent,

    LogicCreateComponent,
    LogicEditComponent,

    OptionCreateComponent,

    MatchLogicCreateComponent,
    MatchCreateComponent,

    //QuestionaryAddComponent,
    //QuestionaryActionComponent,

    //StepAddComponent,
    //StepEditComponent,
    //StepActionComponent,
    
    //QuestionAddComponent,
    //QuestionEditorComponent,

    //MatchsEditorComponent,

    //LogicEditComponent,

    TakenQuizActionComponent,
    TakenQuizHistoryComponent,
    //TreeViewComponent,
    TreeNodeComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    CoolStorageModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    RestService,
    UserService,
    QuestionaryService,
    GroupService,
    QuestionService,
    LogicService,
    OptionService,
    TakenQuizService
  ],
  bootstrap: [AppComponent],
  entryComponents: [QuestionaryCreateComponent, GroupCreateComponent, QuestionCreateComponent, LogicCreateComponent, OptionCreateComponent, MatchLogicCreateComponent, MatchCreateComponent]
})
export class AppModule { }
