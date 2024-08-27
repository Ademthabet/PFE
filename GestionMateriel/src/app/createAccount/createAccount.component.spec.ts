import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCompteComponent } from './createAccount.component';

describe('CreerCompteComponent', () => {
  let component: CreerCompteComponent;
  let fixture: ComponentFixture<CreerCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreerCompteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreerCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
