import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicComponent } from './fic.component';

describe('FicComponent', () => {
  let component: FicComponent;
  let fixture: ComponentFixture<FicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
