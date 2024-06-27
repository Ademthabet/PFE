import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDemComponent } from './modifier-dem.component';

describe('ModifierDemComponent', () => {
  let component: ModifierDemComponent;
  let fixture: ComponentFixture<ModifierDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
