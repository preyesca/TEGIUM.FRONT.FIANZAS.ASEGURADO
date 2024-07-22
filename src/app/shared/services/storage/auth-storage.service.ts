import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly TOKEN_KEY = 'keyAUTH.token_';
  private readonly RTOKEN_KEY = 'keyAUTH.ref.token_';

  constructor(private router: Router) { }

  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  saveRefreshToken(refreshToken: string): void {
    sessionStorage.setItem(this.RTOKEN_KEY, refreshToken);
  }

  saveTokenAndRefreshToken(token: string, refreshToken: string): void {
    this.saveToken(token);
    this.saveRefreshToken(refreshToken);
  }

  getToken(): string {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    return token ?? '';
  }

  getRefreshToken(): string {
    const rtoken = sessionStorage.getItem(this.RTOKEN_KEY);
    return rtoken ?? '';
  }

  isLoggedIn(): boolean {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) !== null &&
      sessionStorage.getItem(this.RTOKEN_KEY) !== null
    );
  }

  logout(): void {
    sessionStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
    //this.router.navigate(['/'], { replaceUrl: true });
  }

  private isRestartCount = new BehaviorSubject<boolean>(false);

  get isRestartCount$() {
    return this.isRestartCount.asObservable();
  }
  
  public restartCount() {
    this.isRestartCount.next(true);
  }
}
