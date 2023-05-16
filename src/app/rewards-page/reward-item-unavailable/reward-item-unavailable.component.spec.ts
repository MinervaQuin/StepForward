import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemUnavailableComponent } from './reward-item-unavailable.component';

describe('RewardItemUnavailableComponent', () => {
  let component: RewardItemUnavailableComponent;
  let fixture: ComponentFixture<RewardItemUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardItemUnavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardItemUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
