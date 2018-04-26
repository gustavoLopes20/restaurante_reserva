import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasUserComponent } from './reservas-user.component';

describe('ReservasUserComponent', () => {
  let component: ReservasUserComponent;
  let fixture: ComponentFixture<ReservasUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
