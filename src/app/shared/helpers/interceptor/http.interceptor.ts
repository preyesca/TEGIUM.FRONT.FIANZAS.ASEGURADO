import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AuthStorageService } from '../../services/storage/auth-storage.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router,
  ) { }
  

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const _token = sessionStorage.getItem('keyToken');
    if (_token !== null) {
      request = this.addHeaders(request, _token);
      return next.handle(request).pipe(
        catchError((error) => {
          this.router.navigateByUrl(`/`);
          return throwError(error);
        })
        ,
        finalize(() => {
          this.resetCount(request)
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private addHeaders(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private resetCount(req: HttpRequest<unknown>) {
    const urlRequest = req.url;
    if(urlRequest.includes('token/refresh')) return;
    this.authStorageService.restartCount();
  }
}
