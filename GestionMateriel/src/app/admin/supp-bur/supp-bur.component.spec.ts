import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppBurComponent } from './supp-bur.component';

describe('SuppBurComponent', () => {
  let component: SuppBurComponent;
  let fixture: ComponentFixture<SuppBurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppBurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppBurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
