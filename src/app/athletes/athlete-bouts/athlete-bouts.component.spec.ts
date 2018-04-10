import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteBoutsComponent } from './athlete-bouts.component';

describe('AthleteBoutsComponent', () => {
  let component: AthleteBoutsComponent;
  let fixture: ComponentFixture<AthleteBoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteBoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteBoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
