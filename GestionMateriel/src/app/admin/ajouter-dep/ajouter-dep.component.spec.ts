import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDepComponent } from './ajouter-dep.component';

describe('AjouterDepComponent', () => {
  let component: AjouterDepComponent;
  let fixture: ComponentFixture<AjouterDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterDepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
