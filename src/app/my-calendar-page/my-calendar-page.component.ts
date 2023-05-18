import {Component, inject, OnInit} from '@angular/core';
import {localeEnGB, MbscEventcalendarOptions, Notifications} from '@mobiscroll/angular';
import {HttpClient} from '@angular/common/http';
import {collection, Firestore, getDocs} from "@angular/fire/firestore";
import {doc, getDoc} from 'firebase/firestore';
import {Auth} from "@angular/fire/auth";

import {Router} from '@angular/router';


interface Event {
  start: Date;
  end: Date;
  text: string;
  color: string;
}

@Component({
  selector: 'app-my-calendar-page',
  templateUrl: './my-calendar-page.component.html',
  styleUrls: ['./my-calendar-page.component.css'],
  providers: [Notifications]
})
export class MyCalendarPageComponent implements OnInit {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  events: Array<any> = [];
  eventsFiltered: any[] | null = [];
  searchTerm: string = "";
  users: Array<any> = [];
  myEvents: Event[] = [];

  constructor(private http: HttpClient, private notify: Notifications, private router: Router) {
    (async () => {
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userID: string = user.uid;
          this.eventsFiltered = await this.getEventsForUser(userID);

          const events: any[] = [];
          // @ts-ignore
          this.eventsFiltered.forEach((event) => {

            const separatedDate = event.data()["date"].split('-');

            const separatedTime = event.data()["time"].split('-');
            const initialTime = separatedTime[0]
            const finalTime = separatedTime[1]

            const initialTimeHour = parseInt(initialTime.split(":")[0], 10);
            const initialTimeMinute = parseInt(initialTime.split(":")[1], 10);

            const finalTimeHour = parseInt(finalTime.split(":")[0], 10);
            const finalTimeMinute = parseInt(finalTime.split(":")[1], 10);

            const startDate = new Date(separatedDate[2], separatedDate[1] - 1, separatedDate[0], initialTimeHour, initialTimeMinute);
            const endDate = new Date(separatedDate[2], separatedDate[1] - 1, separatedDate[0], finalTimeHour, finalTimeMinute);

            const evnt = {
              start: startDate,
              end: endDate,
              text: event.data()["title"],
              color: '#5EA391'
            };

            events.push(evnt);
          });
          this.myEvents = events
        } else {
          await this.router.navigate(['/login']);
        }
      });
    })();
  }


  async loadEventsUser(id: string) {
    try {
      const docRef = doc(this.firestore, 'users', id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userEvents = docSnapshot.data()["events"];

        return Object.entries(userEvents)
          .filter(([_, value]) => value === true)
          .map(([key]) => key);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }


  async getEventsForUser(id: string) {
    try {
      const events = [];
      const eventIds = await this.loadEventsUser(id);

      if (eventIds && eventIds.length > 0) {
        for (const eventId of eventIds) {
          const eventRef = doc(this.firestore, 'events', eventId);
          const eventSnapshot = await getDoc(eventRef);
          events.push(eventSnapshot);
        }
      }

      // @ts-ignore
      events.sort((a, b) => {
        // @ts-ignore
        const dateA = a.data()["date"].split('-');
        // @ts-ignore
        const dateB = b.data()["date"].split('-');
        const dayA = parseInt(dateA[0], 10);
        const monthA = parseInt(dateA[1], 10) - 1;
        const yearA = parseInt(dateA[2], 10);
        const dayB = parseInt(dateB[0], 10);
        const monthB = parseInt(dateB[1], 10) - 1;
        const yearB = parseInt(dateB[2], 10);

        const dateObjA = new Date(yearA, monthA, dayA);
        const dateObjB = new Date(yearB, monthB, dayB);

        return dateObjA.getTime() - dateObjB.getTime();
      });

      return events;
    } catch (error) {
      return null;
    }
  }

  eventSettings: MbscEventcalendarOptions = {
    locale: localeEnGB,
    theme: 'ios',
    themeVariant: 'light',
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    eventDelete: false,
    view: {
      schedule: {type: 'week'}
    },

    onEventClick: (event) => {
      this.notify.toast({
        message: event.event.text,
        color: 'secondary'
      });
    }
  };

  async ngOnInit(): Promise<void> {
  }

  async loadEvents() {
    const colRef = collection(this.firestore, "events");
    const docSnap = await getDocs(colRef);
    this.events = docSnap.docs;
    this.eventsFiltered = this.events;
  }
}

