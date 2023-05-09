import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  { path: 'welcome', component: NotLoggedMainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: MainPageComponent},
  { path: '', redirectTo: '/welcome', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
