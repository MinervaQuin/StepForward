import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reward-item-available',
  templateUrl: './reward-item-available.component.html',
  styleUrls: ['./reward-item-available.component.css']
})
export class RewardItemAvailableComponent {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() photo: string | undefined;
  @Input() value: string | undefined;


}
