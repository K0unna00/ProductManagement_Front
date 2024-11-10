import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const xHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 

  if (!req.url.startsWith('http')) {
    req = req.clone({ url: `${environment.baseUrl}${req.url}` });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        errorMessage = `Server Error: ${error.status} - ${error.message}`;
        if (error.status === 404) {
          router.navigate(['/error'], { queryParams: { message: 'Page not found' } });
        } else if (error.status === 500) {
          router.navigate(['/error'], { queryParams: { message: 'Internal Server Error' } });
        }
      }
      
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};