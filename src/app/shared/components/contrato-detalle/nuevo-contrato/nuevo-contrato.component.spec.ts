import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoContratoComponent } from './nuevo-contrato.component';

describe('NuevoContratoComponent', () => {
  let component: NuevoContratoComponent;
  let fixture: ComponentFixture<NuevoContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
