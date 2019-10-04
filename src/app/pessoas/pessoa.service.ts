//import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Pessoa } from '../core/model';
import { JwtHelperService } from '@auth0/angular-jwt';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private headers: HttpHeaders;
  private options: HttpRequest<any>;
  private token = '';
  private pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService)
  {
    this.token = this.jwtHelper.tokenGetter();

    this.headers =
          new HttpHeaders({ 'Authorization': 'Bearer ' + this.token, });
      this.options = new HttpRequest<any>("HEAD", '{ headers: this.headers}');
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome){
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}?resumo`, {headers: this.headers})
    .toPromise()
    .then(response => {
      const pessoas = response;
      const resultado = {
        pessoas,
        total: response
      };
      return resultado;
    });

  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoaUrl}`, {headers: this.headers})
    .toPromise()
    .then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`, {headers: this.headers})
    .toPromise()
    .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<any> {
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, {headers: this.headers})
    .toPromise()
    .then(() => null);
  }
  salvar(pessoa: Pessoa): Promise<any> {
    return this.http.post(`${this.pessoaUrl}`, pessoa, {headers: this.headers})
    .toPromise()
    .then(response => response);
  }
  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa), {headers: this.headers})
      .toPromise()
      .then(response => {
        const pessoaAlterada = response as Pessoa;
        return pessoaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get(`${this.pessoaUrl}/${codigo}`, {headers: this.headers})
      .toPromise()
      .then(response => {
        const pessoa = response  as Pessoa;
        return pessoa;
      });
  }


}
