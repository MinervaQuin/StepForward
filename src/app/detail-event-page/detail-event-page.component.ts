import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-event-page',
  templateUrl: './detail-event-page.component.html',
  styleUrls: ['./detail-event-page.component.css']
})
export class DetailEventPageComponent {
  images = [
    {src: "../../assets/images/carousel/environment.jpg", title: "Environment Volunteering"},
    {src: "../../assets/images/carousel/teaching.jpg", title: "Teaching Volunteering"},
    {src: "../../assets/images/carousel/food supply.jpeg", title: "Food Supply Volunteering", org:"Red Cross"}
  ]
}
