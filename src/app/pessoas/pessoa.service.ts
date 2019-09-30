import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  PessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Observable<any>{

    const params= new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'sfd');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome){
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.PessoaUrl}?resumo`, {search: params});

  } 

  listarTodas():Observable<any>{
    return this.http.get(`${this.PessoaUrl}`);
  }
}
