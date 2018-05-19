import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomescreenComponent } from './user-homescreen.component';

describe('UserHomescreenComponent', () => {
  let component: UserHomescreenComponent;
  let fixture: ComponentFixture<UserHomescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
