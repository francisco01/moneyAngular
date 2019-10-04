import { AuthService } from './../seguranca/auth.service';
import { Observable } from 'rxjs';
//import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';

import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { Options } from 'selenium-webdriver';
import { JwtHelperService } from '@auth0/angular-jwt';


export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private headers: HttpHeaders;
  private options: HttpRequest<any>;
  private token = '';

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService)
  {
    this.token = jwtHelper.tokenGetter();
    this.headers =
          new HttpHeaders({ 'Authorization': 'Bearer ' + this.token, });
      this.options = new HttpRequest<any>("HEAD", '{ headers: this.headers}');
   }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    //let httpHeaders = new HttpHeaders();
    let params = new HttpParams()
    .set('page', filtro.pagina.toString())
    .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe',
      moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte',
      moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    return this.http.get(`${this.lancamentoUrl}?resumo`,
    {headers: this.headers, params}
    )
    .toPromise()
    .then(response => {
      const lancamentos = response;
      const resultado = {
        lancamentos,
        total: response
      };
      return resultado;
    });
  }
  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, {headers: this.headers})
    .toPromise()
    .then(() => null);
  }
  salvar(lancamento: Lancamento): Promise<any> {
    return this.http.post(`${this.lancamentoUrl}`, lancamento, {headers: this.headers})
    .toPromise()
    .then(response => response);
  }
  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put(`${this.lancamentoUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento), {headers: this.headers})
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentoUrl}/${codigo}`, {headers: this.headers})
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
