import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';
import { RewardsPageComponent } from './rewards-page/rewards-page.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {MyCalendarPageComponent} from "./my-calendar-page/my-calendar-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {DetailEventPageComponent} from "./detail-event-page/detail-event-page.component";

const routes: Routes = [
  { path: 'rewards', component: RewardsPageComponent },
  { path: 'welcome', component: NotLoggedMainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: MainPageComponent},
  { path: '', redirectTo: '/welcome', pathMatch: "full"},
  { path: 'mycalendar', component: MyCalendarPageComponent },
  { path: 'event', component: DetailEventPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
