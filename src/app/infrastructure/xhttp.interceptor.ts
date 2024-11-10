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
      
      errorMessage = `Error: ${error.error.ErrorMessage}`;
      router.navigate(['/error'], { queryParams: { message: errorMessage } });
      
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};