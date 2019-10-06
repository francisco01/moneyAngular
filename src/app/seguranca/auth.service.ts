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

  login(usuario: string, senha: string): Observable<Jwt> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<Jwt>(this.oauthTokenUrl, body, { headers, withCredentials: true });

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

  temPermissao(permissao: string){
    console.log("permissão: ", this.jwtPayload.authorites.includes(permissao));
    return this.jwtPayload && this.jwtPayload.authorites.includes(permissao);
  }

  obterNovoAcessToken():Promise<void>{

    const body = 'grant_type=refresh_token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });
    
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
     // this.armazenarToken()

      this.jwtHelper.isTokenExpired()
    }).catch(response => {
        console.log('Erro ao renovar token', response);
        return Promise.resolve(null);
    });
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

}
