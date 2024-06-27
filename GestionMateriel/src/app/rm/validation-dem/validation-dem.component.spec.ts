import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemComponent } from './validation-dem.component';

describe('ValidationDemComponent', () => {
  let component: ValidationDemComponent;
  let fixture: ComponentFixture<ValidationDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationDemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
