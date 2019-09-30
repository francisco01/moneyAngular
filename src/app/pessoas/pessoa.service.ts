import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../core/model';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any>{

    const params= new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'sfd');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome){
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}?resumo`, {search: params})
    .toPromise()
    .then(response => {
      const pessoas = response.content;
      const resultado = {
        pessoas,
        total: response.totalElements
      };
      return resultado;
    });

  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoaUrl}`)
    .toPromise()
    .then(response => response);
  }

  excluir(codigo: number): Promise<any>{
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<any>{
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo)
    .toPromise()
    .then(() => null);
  }
  salvar(pessoa: Pessoa): Promise<any> {
    return this.http.post(`${this.pessoaUrl}`, pessoa)
    .toPromise()
    .then(response => response);
  }
}
