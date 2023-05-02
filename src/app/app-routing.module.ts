import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';

const routes: Routes = [
  { path: '', component: NotLoggedMainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
