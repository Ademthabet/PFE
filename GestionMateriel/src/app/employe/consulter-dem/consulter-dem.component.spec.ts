import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDemComponent } from './consulter-dem.component';

describe('ConsulterDemComponent', () => {
  let component: ConsulterDemComponent;
  let fixture: ComponentFixture<ConsulterDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterDemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
