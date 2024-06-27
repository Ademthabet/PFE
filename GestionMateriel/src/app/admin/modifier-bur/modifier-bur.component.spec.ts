import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBurComponent } from './modifier-bur.component';

describe('ModifierBurComponent', () => {
  let component: ModifierBurComponent;
  let fixture: ComponentFixture<ModifierBurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierBurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierBurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
