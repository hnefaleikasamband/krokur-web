import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteHomescreenComponent } from './athlete-homescreen.component';

describe('AthleteHomescreenComponent', () => {
  let component: AthleteHomescreenComponent;
  let fixture: ComponentFixture<AthleteHomescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteHomescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteHomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
