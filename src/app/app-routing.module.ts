import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';
import { RewardsPageComponent } from './rewards-page/rewards-page.component';

const routes: Routes = [
  { path: '', component: NotLoggedMainPageComponent }
  ,
  { path: 'rewards', component: RewardsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
