import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 401:
            errorMessage = 'Session expired or unauthenticated. Redirecting to login.';
            break;
          case 403:
            errorMessage = 'Forbidden: You do not have Local DB permissions for this resource.';
            router.navigate(['/unauthorized'], {
              queryParams: { reason: 'HTTP_403_FORBIDDEN', url: req.url }
            });
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Internal Server Error. Please contact system administrator.';
            break;
          default:
            errorMessage = `HTTP Error Code ${error.status}: ${error.message}`;
        }
      }

      console.error('[HttpInterceptor Error Handler]', errorMessage, error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
