import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoleccionFisicosComponent } from './recoleccion-fisicos.component';

describe('RecoleccionFisicosComponent', () => {
  let component: RecoleccionFisicosComponent;
  let fixture: ComponentFixture<RecoleccionFisicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoleccionFisicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoleccionFisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
