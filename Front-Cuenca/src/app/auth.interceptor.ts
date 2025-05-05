import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../app/core/services/token.service';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenNode = this.authService.getTokenNode();
    const tokenSpring = this.authService.getTokenSpring();

    if (request.url.includes('localhost:3000')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenNode}`,
          'Authorization-Spring': `${tokenSpring}`,
        },
      });
    }

    return next.handle(request);
  }
}
