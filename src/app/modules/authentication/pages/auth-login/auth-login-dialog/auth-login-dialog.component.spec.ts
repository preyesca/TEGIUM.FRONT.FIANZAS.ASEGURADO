import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginDialogComponent } from './auth-login-dialog.component';

describe('AuthLoginDialogComponent', () => {
  let component: AuthLoginDialogComponent;
  let fixture: ComponentFixture<AuthLoginDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthLoginDialogComponent]
    });
    fixture = TestBed.createComponent(AuthLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
