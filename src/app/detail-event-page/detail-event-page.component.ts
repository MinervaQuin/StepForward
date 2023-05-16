import {Component, inject} from '@angular/core';
import {localeEnGB, MbscEventcalendarOptions, Notifications} from '@mobiscroll/angular';
import {collection, Firestore, getDocs, query, updateDoc, where} from "@angular/fire/firestore";
import {doc, DocumentData, getDoc, QueryDocumentSnapshot} from 'firebase/firestore';
import {Auth} from "@angular/fire/auth";


interface Event {
  start: Date;
  end: Date;
  text: string;
  color: string;
}

@Component({
  selector: 'app-detail-event-page',
  templateUrl: './detail-event-page.component.html',
  styleUrls: ['./detail-event-page.component.css']
})

export class DetailEventPageComponent {

  events: QueryDocumentSnapshot<DocumentData>[] | undefined;
  eventsFiltered: string[] | undefined;
  organizationEvent: Event[] = [];
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  title: string | null = "";
  organization: string | null = "";
  description: string = "";
  urlImage: string = "";

  formattedStartDate: string | undefined;
  formattedStartTime: string | undefined;
  formattedEndTime: string | undefined

  constructor(private notify: Notifications) {
    (async () => {

      this.title = localStorage.getItem("event");
      this.organization = localStorage.getItem("organization");

      const colRef = collection(this.firestore, "events");
      const q = query(
        colRef,
        where("organizationName", "==", this.organization),
        where("title", "==", this.title)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.description = data["description"];
        this.urlImage = data["urlImage"];
      });


      await this.loadEvents();
      await this.searchEvents();
    })();
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
      // @ts-ignore
      const startDate = new Date(event.event.start);
      // @ts-ignore
      const endDate = new Date(event.event.end);

      this.formattedStartDate = `${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()}`;
      this.formattedStartTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;

      this.formattedEndTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

      this.notify.toast({
        message: `${this.formattedStartDate} ${this.formattedStartTime}-${this.formattedEndTime}`,
        color: 'secondary'
      });
    }
  }

  async loadEvents() {
    const colRef = collection(this.firestore, "events");
    const q = query(colRef, where("organizationName", "==", this.organization), where("title", "==", this.title));
    const querySnapshot = await getDocs(q);
    this.eventsFiltered = querySnapshot.docs.map((doc) => doc.id);
    return this.eventsFiltered;
  }


  async searchEvents() {
    const eventsCollectionRef = collection(this.firestore, "events");

    const foundEvents = [];

    // @ts-ignore
    for (const eventId of this.eventsFiltered) {
      const eventDocRef = doc(eventsCollectionRef, eventId);
      const eventDocSnapshot = await getDoc(eventDocRef);

      if (eventDocSnapshot.exists()) {
        const eventData = eventDocSnapshot.data();

        const separatedDate = eventData["date"].split('-');

        const separatedTime = eventData["time"].split('-');
        const initialTime = separatedTime[0]
        const finalTime = separatedTime[1]


        const initialTimeHour = parseInt(initialTime.split(":")[0], 10);
        const initialTimeMinute = parseInt(initialTime.split(":")[1], 10);

        const finalTimeHour = parseInt(finalTime.split(":")[0], 10);
        const finalTimeMinute = parseInt(finalTime.split(":")[1], 10);

        const startDate = new Date(separatedDate[2], separatedDate[1] - 1, separatedDate[0], initialTimeHour, initialTimeMinute); // Usa la fecha y hora actual como inicio (puedes ajustarla según tus necesidades)
        const endDate = new Date(separatedDate[2], separatedDate[1] - 1, separatedDate[0], finalTimeHour, finalTimeMinute);

        const capacity = eventData["capacity"];

        if (capacity >= 1) {
          const evnt = {
            start: startDate,
            end: endDate,
            text: eventData["title"],
            color: '#5EA391'
          };
          foundEvents.push(evnt);
        } else {
          const evnt = {
            start: startDate,
            end: endDate,
            text: eventData["title"],
            color: '#ff0000'
          };
          foundEvents.push(evnt);
        }
      }
    }
    this.organizationEvent = foundEvents;

    return foundEvents;
  }

  async suscribe() {

    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const colRef = collection(this.firestore, "events");

        const q = query(
          colRef,
          where("organizationName", "==", this.organization),
          where("title", "==", this.title),
          where("date", "==", this.formattedStartDate),
          where("time", "==", this.formattedStartTime + "-" + this.formattedEndTime)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          return null;
        }

        const firstDoc = querySnapshot.docs[0];
        const documentId = firstDoc.id;


        const eventDocRef = doc(collection(this.firestore, "events"), documentId);
        const data = await getDoc(eventDocRef);
        // @ts-ignore
        const capacity = data.data()["capacity"];

        if (capacity >= 1) {


          const userID: string = user.uid;
          const userDocRef = doc(this.firestore, "users", userID);

          const extraField = documentId;
          const extraValue = true;


          const fieldKey = extraField;
          const fieldValue = true;

          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const eventData = userDocSnapshot.get("events");
            if (eventData && eventData[fieldKey] === fieldValue) {
              alert("You were subscribed to this event");
              return null;
            } else {
              await updateDoc(eventDocRef, {
                ["capacity"]: capacity - 1
              });

              await updateDoc(userDocRef, {
                [`events.${extraField}`]: extraValue
              });
              alert("You have subscribed to the event successfully");
              window.location.reload();
            }
          } else {
            return null;
          }
        } else {
          alert("The capacity of this event is full");
        }
        return null;

      } else {
        alert("In order to participate in this event, you must be logged in");
        return null;
      }
    });
  }
}
