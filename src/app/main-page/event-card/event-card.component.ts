import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() image: string | undefined;
  @Input() title: string | undefined;
  @Input() organizationName: string | undefined;
  @Input() description: string | undefined;
  @Input() reward: string | undefined;
  @Input() date: string | undefined;

}
