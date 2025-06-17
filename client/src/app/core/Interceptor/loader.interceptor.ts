// loader.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, delay } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.loading();

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      loadingService.hideLoader();
    })
  );
};
