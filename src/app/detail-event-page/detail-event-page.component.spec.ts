import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventPageComponent } from './detail-event-page.component';

describe('DetailEventPageComponent', () => {
  let component: DetailEventPageComponent;
  let fixture: ComponentFixture<DetailEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEventPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
