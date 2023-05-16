import {Component, inject} from '@angular/core';
import {Firestore, collection, getDocs} from "@angular/fire/firestore";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  private firestore: Firestore = inject(Firestore);
  events: Array<any> = [];

  eventsFiltered: Array<any> = [];

   searchTerm: string = "";

  constructor(private router: Router) {
    this.loadEvents()
  }


  async loadEvents() {
    const colRef = collection(this.firestore, "events");
    const docSnap = await getDocs(colRef);
    this.events = docSnap.docs;
    this.eventsFiltered = this.events;
  }

  searchFilter(){
    this.eventsFiltered = [];
    this.events.forEach((doc) => {
      if(doc.data().title.toUpperCase().includes(this.searchTerm.toUpperCase())){
        this.eventsFiltered.push(doc);
      }
    })
  }

  async redirection(organization: string, event: string) {
    localStorage.setItem("organization", organization);
    localStorage.setItem("event", event);

    console.log(localStorage.getItem("organization"));
    console.log(localStorage.getItem("event"));
    await this.router.navigate(['/event']);
  }






}
