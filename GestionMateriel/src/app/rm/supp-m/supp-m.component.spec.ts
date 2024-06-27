import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppMComponent } from './supp-m.component';

describe('SuppMComponent', () => {
  let component: SuppMComponent;
  let fixture: ComponentFixture<SuppMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
