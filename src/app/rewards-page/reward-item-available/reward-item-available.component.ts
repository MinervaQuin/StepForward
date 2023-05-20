import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-reward-item-available',
  templateUrl: './reward-item-available.component.html',
  styleUrls: ['./reward-item-available.component.css'],
})
export class RewardItemAvailableComponent {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() photo: string | undefined;
  @Input() value: string | undefined;

  @Output() linkTextChanged: EventEmitter<string> = new EventEmitter<string>();
  linkText: string = 'Unlock it!';
  isVisible: boolean = true;

  changeLinkText(){
    //console.log('ESTE ES EL VALOR QUE ESTAMOS RESTANDO', this.value);
    this.linkText= 'Reward unlocked';
    this.linkTextChanged.emit(this.value);
  }
  hideElement(){
    this.isVisible=false;
  }

}
