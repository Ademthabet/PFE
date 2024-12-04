import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppDemComponent } from './deleteDemande.component';

describe('SuppDemComponent', () => {
  let component: SuppDemComponent;
  let fixture: ComponentFixture<SuppDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppDemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuppDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
