import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEmpComponent } from './modifier-emp.component';

describe('ModifierEmpComponent', () => {
  let component: ModifierEmpComponent;
  let fixture: ComponentFixture<ModifierEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
