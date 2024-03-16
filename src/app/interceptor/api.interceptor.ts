import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneReq = req.clone({
    url: 'http://localhost:3000' + req.url,
  });
  return next(cloneReq);
};
