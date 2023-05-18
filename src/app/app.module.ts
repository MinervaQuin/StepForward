import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from './register-page/register-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginPageComponent } from './login-page/login-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {environment} from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FooterComponent } from './footer/footer.component';
import { RewardsPageComponent } from './rewards-page/rewards-page.component';
import {RewardItemAvailableComponent} from "./rewards-page/reward-item-available/reward-item-available.component";
import {RewardItemUnavailableComponent} from "./rewards-page/reward-item-unavailable/reward-item-unavailable.component";

@NgModule({
  declarations: [
    AppComponent,
    NotLoggedMainPageComponent,
    RewardsPageComponent,
    NotLoggedMainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    FooterComponent,
    RewardItemAvailableComponent,
    RewardItemUnavailableComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
