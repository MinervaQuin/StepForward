import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLoggedMainPageComponent } from './not-logged-main-page.component';

describe('NotLoggedMainPageComponent', () => {
  let component: NotLoggedMainPageComponent;
  let fixture: ComponentFixture<NotLoggedMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotLoggedMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotLoggedMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
