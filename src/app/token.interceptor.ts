import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storedToken = localStorage.getItem('JWT_Token');
  const parsed = storedToken ? JSON.parse(storedToken) : null;
  const token = parsed?.token;
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newReq);
};
