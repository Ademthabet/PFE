import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMComponent } from './addMateriel.component';

describe('AjouterMComponent', () => {
  let component: AjouterMComponent;
  let fixture: ComponentFixture<AjouterMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterMComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AjouterMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
