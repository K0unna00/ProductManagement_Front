import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const xHttpInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (!req.url.startsWith('http')) {
    const apiReq = req.clone({
        url: `${environment.baseUrl}${req.url}`
    });
    return next(apiReq);
}

  return next(req);
};
