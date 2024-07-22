import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowedDocumentsComponent } from './allowed-documents.component';

describe('AllowedDocumentsComponent', () => {
  let component: AllowedDocumentsComponent;
  let fixture: ComponentFixture<AllowedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowedDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
