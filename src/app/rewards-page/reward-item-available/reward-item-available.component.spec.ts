import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemAvailableComponent } from './reward-item-available.component';

describe('RewardItemAvailableComponent', () => {
  let component: RewardItemAvailableComponent;
  let fixture: ComponentFixture<RewardItemAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardItemAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardItemAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
