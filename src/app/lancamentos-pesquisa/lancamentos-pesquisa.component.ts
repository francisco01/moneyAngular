import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [
    {
      tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2019',
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'
    },
    {
      tipo: 'RECEITA', descricao: 'Venda de Software', dataVencimento: '30/06/2019',
      dataPagamento: '20/09/2019', valor: 80000, pessoa: 'Login'
    },
    {
      tipo: 'DESPESA', descricao: '/impostos', dataVencimento: '30/06/2019',
      dataPagamento: null, valor: 15469, pessoa: 'Ministério da Fazenda'
    },
    {
      tipo: 'RECEITA', descricao: 'Venda de Carro', dataVencimento: '20/10/2019',
      dataPagamento: null, valor: 40000, pessoa: 'Maria'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
