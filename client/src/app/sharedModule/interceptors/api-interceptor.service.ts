import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.currentUserChanged.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: { auth: user.loginToken }
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
