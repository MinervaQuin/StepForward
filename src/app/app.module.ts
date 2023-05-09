import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotLoggedMainPageComponent } from './not-logged-main-page/not-logged-main-page.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from './register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginPageComponent } from './login-page/login-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EventCardComponent } from './main-page/event-card/event-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NotLoggedMainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    FooterComponent,
    MainPageComponent,
    EventCardComponent
  ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgbCarouselModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
