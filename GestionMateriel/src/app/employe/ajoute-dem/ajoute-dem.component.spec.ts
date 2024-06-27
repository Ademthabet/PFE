import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteDemComponent } from './ajoute-dem.component';

describe('AjouteDemComponent', () => {
  let component: AjouteDemComponent;
  let fixture: ComponentFixture<AjouteDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteDemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
