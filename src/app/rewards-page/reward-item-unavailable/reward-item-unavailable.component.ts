import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-reward-item-unavailable',
  templateUrl: './reward-item-unavailable.component.html',
  styleUrls: ['./reward-item-unavailable.component.css']
})
export class RewardItemUnavailableComponent {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() photo: string | undefined;
  @Input() value: string | undefined;
}
