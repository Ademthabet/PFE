import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMatComponent } from './consultMateriel.component';

describe('ConsulterMatComponent', () => {
  let component: ConsulterMatComponent;
  let fixture: ComponentFixture<ConsulterMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterMatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsulterMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
