import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {MyCalendarPageComponent} from "./my-calendar-page/my-calendar-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', component: NotLoggedMainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'mycalendar', component: MyCalendarPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
