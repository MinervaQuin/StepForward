import { Component, inject } from '@angular/core';
import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent, localeEs, localeEnGB } from '@mobiscroll/angular';
import {Firestore, collection, getDocs, query, where, updateDoc} from "@angular/fire/firestore";
import { doc, DocumentData, getDoc, QueryDocumentSnapshot} from 'firebase/firestore';
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
  title: string = "";
  organization: string = "";
  description: string = "";
  urlImage: string = "";

  formattedStartDate: string | undefined;
  formattedStartTime: string | undefined;
  formattedEndTime: string | undefined

    constructor(private notify: Notifications) {
      (async () => {;

      //localStorage.setItem('organization', 'Hope Works');
      //localStorage.setItem('event', 'Solidarity race for the protection of the environment.');

      // @ts-ignore
      this.title = localStorage.getItem("event");
      // @ts-ignore
      this.organization = localStorage.getItem("organization");

      const colRef = collection(this.firestore, "events");
      const q = query(
        colRef,
        where("organizationName", "==", this.organization),
        where("title", "==", this.title)
      );
      const querySnapshot = await getDocs(q);

      const eventData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Hacer algo con los datos del documento
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
      // Obtener fecha de inicio y finalización
      // @ts-ignore
      const startDate = new Date(event.event.start);
      // @ts-ignore
      const endDate = new Date(event.event.end);

      // Formatear fecha de inicio
      this.formattedStartDate = `${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()}`;
      this.formattedStartTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;

      // Formatear fecha de finalización
      this.formattedEndTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

      this.notify.toast({
        message: `${this.formattedStartDate} ${this.formattedStartTime}-${this.formattedEndTime}`,
        color: 'secondary'
      });
    }
  }

  async loadEvents() {
    const colRef = collection(this.firestore, "events");
    // Crear la consulta con los filtros
    const q = query(colRef, where("organizationName", "==", "Hope Works"), where("title", "==", "Solidarity race for the protection of the environment."));
    const querySnapshot = await getDocs(q);
    this.eventsFiltered = querySnapshot.docs.map((doc) => doc.id);
    return this.eventsFiltered;
  }


  async searchEvents() {
    const eventsCollectionRef = collection(this.firestore, "events");

    // Crear un arreglo para almacenar los eventos encontrados
    const foundEvents = [];

    // Recorrer los identificadores de eventos filtrados
    // @ts-ignore
    for (const eventId of this.eventsFiltered) {
      const eventDocRef = doc(eventsCollectionRef, eventId);
      const eventDocSnapshot = await getDoc(eventDocRef);

      // Verificar si el evento existe y agregarlo al arreglo de eventos encontrados
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

        const startDate = new Date(separatedDate[2], separatedDate[1]-1, separatedDate[0], initialTimeHour, initialTimeMinute); // Usa la fecha y hora actual como inicio (puedes ajustarla según tus necesidades)
        const endDate = new Date(separatedDate[2], separatedDate[1]-1, separatedDate[0], finalTimeHour, finalTimeMinute);

        const capacity = eventData["capacity"];

        if (capacity >= 1){
          const evnt = {
            start: startDate,
            end: endDate,
            text: eventData["title"],
            color: '#5EA391'
          };
          foundEvents.push(evnt);
        }else{
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

  async suscribe(){

    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const colRef = collection(this.firestore, "events");

        // Crear la consulta con los filtros
        const q = query(
          colRef,
          where("organizationName", "==", "Hope Works"),
          where("title", "==", "Solidarity race for the protection of the environment."),
          where("date", "==", this.formattedStartDate),
          where("time", "==", this.formattedStartTime+"-"+this.formattedEndTime)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // No se encontraron documentos que cumplan las condiciones
          return null;
        }

        // Obtener el ID del primer documento que cumple las condiciones
        const firstDoc = querySnapshot.docs[0];
        const documentId = firstDoc.id;


        const eventDocRef = doc(collection(this.firestore, "events"), documentId);
        const data = await getDoc(eventDocRef);
        // @ts-ignore
        const capacity = data.data()["capacity"];

        if (capacity >= 1){


          const userID: string = user.uid;
          const userDocRef = doc(this.firestore, "users", userID);

          const extraField = documentId; // Nombre del nuevo campo que deseas añadir
          const extraValue = true; // Valor del nuevo campo



          const fieldKey = extraField; // Clave del campo en el mapa "events"
          const fieldValue = true; // Valor del campo en el mapa "events"

          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const eventData = userDocSnapshot.get("events");
            if (eventData && eventData[fieldKey] === fieldValue) {
              alert("You were subscribed to this event");
              return null;
            } else {
              // Actualizar el campo especificado con el nuevo valor
              await updateDoc(eventDocRef, {
                ["capacity"]: capacity-1
              });

              // Añadir el nuevo campo al mapa "events"
              await updateDoc(userDocRef, {
                [`events.${extraField}`]: extraValue
              });
              alert("You have subscribed to the event successfully");
              window.location.reload();
            }
          } else {
            return null;
          }
        }else{
          alert("The capacity of this event is full");
        }
        return null;

      }else{
        alert("In order to participate in this event, you must be logged in");
        return null;
      }
    });
  }
}
