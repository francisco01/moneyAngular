import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    {
      nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG',
      status: 'Ativo'
    },

    {
      nome: 'Sebastião da Silva', cidade: 'Salvador', estado: 'BA',
      status: 'Inativo'
    }

  ];
  constructor() { }

  ngOnInit() {
  }

}
