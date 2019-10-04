import { HttpClient, HttpRequest } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './http-auth-interceptor';

//import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

// export function authHttpServiceFactory(http: HttpClient, options: HttpRequest<any>) {
//   const config = new AuthConfig({
//     globalHeaders: [
//       { 'Content-Type': 'application/json' }
//     ]
//   });

//   return new AuthHttp(config, http, options);
// }

// export function jwtOptionsFactory() {
//   return {
//     tokenGetter: () => localStorage.getItem("access_token"),
//     whitelistedDomains: ["localhost:4200"],
//     blacklistedRoutes: ["http://localhost:4200/login"]
//   };
// }

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,
    HttpClientModule,
    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: jwtOptionsFactory,
    //   }
    // }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200/lancamentos/novo', 'localhost:4200/lancamentos',
        'localhost:4200/pessoas/novo', 'localhost:4200/pessoas'],
        blacklistedRoutes: ['localhost:4200/login']
      }
    })
  ],
  declarations: [LoginFormComponent],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: HttpAuthInterceptor,
  //     multi: true
  //   },
  //   JwtHelperService
  // ],
    // {
    //   provide: AuthHttp,
    //   useFactory: authHttpServiceFactory,
    //   deps: [HttpClient, HttpRequest]
    // }

})
export class SegurancaModule { }
