import { Component } from '@angular/core';

@Component({
  selector: 'app-not-logged-main-page',
  templateUrl: './not-logged-main-page.component.html',
  styleUrls: ['./not-logged-main-page.component.css']
})
export class NotLoggedMainPageComponent {
  images = [
    {src: "../../assets/images/carousel/environment.jpg", title: "Environment Volunteering"},
    {src: "../../assets/images/carousel/teaching.jpg", title: "Teaching Volunteering"},
    {src: "../../assets/images/carousel/food supply.jpeg", title: "Food Supply Volunteering"}
  ]

}
