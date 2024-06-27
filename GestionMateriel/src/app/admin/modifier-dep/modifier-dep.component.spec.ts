import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDepComponent } from './modifier-dep.component';

describe('ModifierDepComponent', () => {
  let component: ModifierDepComponent;
  let fixture: ComponentFixture<ModifierDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
