// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from '../src/app/auth.interceptor'; // <-- tu interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers!,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // <-- aquí se registra
  ],
}).catch((err) => console.error(err));
