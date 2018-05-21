import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleBoutComponent } from './add-single-bout.component';

describe('AddSingleBoutComponent', () => {
  let component: AddSingleBoutComponent;
  let fixture: ComponentFixture<AddSingleBoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSingleBoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSingleBoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
