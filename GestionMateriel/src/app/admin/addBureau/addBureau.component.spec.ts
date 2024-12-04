import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBurComponent } from './addBureau.component';

describe('AjouterBurComponent', () => {
  let component: AjouterBurComponent;
  let fixture: ComponentFixture<AjouterBurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterBurComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AjouterBurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
