import { Jwt } from './login-form/Jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService  } from '@auth0/angular-jwt';
import 'rxjs';
import { Observable, of } from 'rxjs';
import { share, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;
  resultado: string[] = new Array();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
    this.jwtHelper.tokenGetter();
  }

  refreshToken(): Observable<string> {
    const url = 'url to refresh token here';

    // append refresh token if you have one
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredToken = localStorage.getItem('token');

    return this.http
      .get(url, {
        headers: new HttpHeaders()
          .set('refreshToken', refreshToken)
          .set('token', expiredToken),
        observe: 'response'
      })
      .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');

          // store the new tokens
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('token', token);

          return token;
        })
      );
  }

  getToken(): Observable<string> {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);

    if (!isTokenExpired) {
      return of(token);
    }

    return this.refreshToken();
  }

  // other auth methods

  login(usuario: string, senha: string): Observable<Jwt> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<Jwt>(this.oauthTokenUrl, body, { headers });

      // .subscribe(response => {
      //   let resultado = [];
      //   JSON.parse(response.toString());
      //   resultado = response;
      //   console.log("teste", resultado.access_token);
      //   this.armazenarToken(response.valueOf() as string);
      // })
      // .catch(response => {
      //   if (response.status === 400) {
      //     const responseJson = response.json();

      //     if (responseJson.error === 'invalid_grant') {
      //       return Promise.reject('Usuário ou senha inválida!');
      //     }
      //   }

      //   return Promise.reject(response);
      // });
  }

  armazenarToken(token: string) {
    //this.resultado = token.valueOf
    console.log("armazenar", token);
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    console.log("payload", this.jwtPayload);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      this.armazenarToken(token);
    }
  }

}
