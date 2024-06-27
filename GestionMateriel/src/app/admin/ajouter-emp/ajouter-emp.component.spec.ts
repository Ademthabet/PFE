import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmpComponent } from './ajouter-emp.component';

describe('AjouterEmpComponent', () => {
  let component: AjouterEmpComponent;
  let fixture: ComponentFixture<AjouterEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
