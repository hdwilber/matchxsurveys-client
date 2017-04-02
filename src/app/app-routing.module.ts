import { NgModule }             from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from "@angular/forms";

// Components
import { AppComponent }  from './app.component';
import { UserLoginComponent }  from './user/login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import { QuestionaryEditComponent } from './questionary/edit/questionary-edit.component';
import { GroupEditComponent } from './group/edit/group-edit.component';
import { QuestionEditComponent } from './question/edit/question-edit.component';
import { LogicEditComponent } from './logic/edit/logic-edit.component';
import { TakenQuizActionComponent } from './taken-quiz/action/taken-quiz-action.component';
import { TakenQuizHistoryComponent } from './taken-quiz/history/taken-quiz-history.component';

//import { QuestionaryAddComponent } from './questionary/questionary-add.component';
//import { QuestionaryActionComponent } from './questionary/questionary-action.component';
//import { QuestionaryEditComponent } from './questionary/questionary-edit.component';
//import { StepAddComponent } from './questionary/step-add.component';
//import { StepEditComponent } from './questionary/step-edit.component';
//import { QuestionAddComponent }  from './questionary/question-add.component';
//import { TakenQuizActionComponent } from './questionary/taken-quiz-action.component';
//import { TakenQuizHistoryComponent } from './questionary/taken-quiz-history.component';

//import { MatchsEditorComponent } from './questionary/matchs-editor.component';
//import { LogicEditComponent } from './questionary/logic-edit.component';

//import { QuestionListComponent }  from './question/question-list.component';
//import { StepAddComponent }  from './question/step-add.component';
//import { OptionAddComponent }  from './question/option-add.component';
//import { LogicAddComponent }  from './question/logic-add.component';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from "@angular/http";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: '', component: AppComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'home', component: HomeComponent },
    { path: 'questionaries/:questionaryId/edit', component: QuestionaryEditComponent },
    { path: 'group/:groupId/edit', component: GroupEditComponent },
    { path: 'question/:questionId/edit', component: QuestionEditComponent },
    { path: 'logic/:logicId/edit', component: LogicEditComponent },
    { path: 'take/:takenQuizId', component: TakenQuizActionComponent},
    { path: 'history/:takenQuizId', component: TakenQuizHistoryComponent}
    //{ path: 'questionaries/add', component: QuestionaryAddComponent},
    //{ path: 'questionaries/:questionaryId/edit', component: QuestionaryEditComponent},
    //{ path: 'questionaries/:questionaryId/steps/:stepId/edit', component: QuestionaryEditComponent},

    //{ path: 'questionaries/:questionaryId', component: QuestionaryActionComponent},
    //{ path: 'questionaries/:questionaryId/steps/add', component: StepAddComponent},
    //{ path: 'steps/:stepId/questions/add', component: QuestionAddComponent },

    //{ path: 'questionaries/:questionaryId/logics/:logicId/edit', component: MatchsEditorComponent},
    //{ path: 'logics/:logicId/edit', component: LogicEditComponent},
];

@NgModule({
    imports: [ 
    RouterModule.forRoot(routes, { useHash: true })  // .../#/crisis-center/
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
