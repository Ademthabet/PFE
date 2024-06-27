import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmpComponent } from './profile-emp.component';

describe('ProfileEmpComponent', () => {
  let component: ProfileEmpComponent;
  let fixture: ComponentFixture<ProfileEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
