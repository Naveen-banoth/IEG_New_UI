import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - startTime;
          console.log(`[HTTP Request Success] ${req.method} ${req.urlWithParams} - Status: ${event.status} (${elapsed}ms)`);
        }
      },
      error: (error) => {
        const elapsed = Date.now() - startTime;
        console.warn(`[HTTP Request Failed] ${req.method} ${req.urlWithParams} - (${elapsed}ms)`, error);
      }
    })
  );
};
