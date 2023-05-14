import {Component, inject, Input} from '@angular/core';
import {collection, doc, Firestore, getDoc, getDocs, setDoc, updateDoc} from "@angular/fire/firestore";
import {Auth, onAuthStateChanged} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rewards-page',
  templateUrl: './rewards-page.component.html',
  styleUrls: ['./rewards-page.component.css']
})
export class RewardsPageComponent {
  private firestore: Firestore = inject(Firestore);
  rewards: Array<any> = [];
  userSignedIn: string = '';
  userCoins: number = 0;
  private auth: Auth = inject(Auth);

  constructor(private router: Router) {

    this.getActualUser();
    this.loadEvents()
  }

  async loadEvents() {
    const colRef = collection(this.firestore, "rewards");
    const docSnap = await getDocs(colRef);
    this.rewards = docSnap.docs;
  }

  async getActualUser() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.userSignedIn = user.uid;
        const docRef = doc(this.firestore, "users", this.userSignedIn);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.userCoins = parseInt(docSnap?.data()['coins']);
        } else {
          await setDoc(docRef, {
            coins: 0
          });
          this.userCoins = 0;


        }

        // ...
      } else {
        // User is signed out
        // ...
        await this.router.navigate(["/"])
      }
    });
  }


  protected readonly parseInt = parseInt;
}
