import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationMComponent } from './affectMateriel.component';

describe('AffectationMComponent', () => {
  let component: AffectationMComponent;
  let fixture: ComponentFixture<AffectationMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffectationMComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AffectationMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
