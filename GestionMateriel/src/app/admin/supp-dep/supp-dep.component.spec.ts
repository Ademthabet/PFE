import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppDepComponent } from './supp-dep.component';

describe('SuppDepComponent', () => {
  let component: SuppDepComponent;
  let fixture: ComponentFixture<SuppDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppDepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
