import { Options } from 'selenium-webdriver';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private token = '';
  private headers: HttpHeaders;
  private options: HttpRequest<any>;

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {

    this.token = this.jwtHelper.tokenGetter();
    //console.log('token cat', this.token);

    this.headers =
          new HttpHeaders({ 'Authorization': 'Bearer ' + this.token, });
      this.options = new HttpRequest<any>("HEAD", '{ headers: this.headers}');

   }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriaUrl, {headers: this.headers})
    .toPromise()
    .then(response => response).catch(erro => console.log(erro));
  }
}
