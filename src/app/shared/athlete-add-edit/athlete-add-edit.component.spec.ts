import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteAddEditComponent } from './athlete-add-edit.component';

describe('AthleteAddEditComponent', () => {
  let component: AthleteAddEditComponent;
  let fixture: ComponentFixture<AthleteAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
