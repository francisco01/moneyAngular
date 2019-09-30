import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', null) grid: any;

  constructor(private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
      ) { }

  ngOnInit() {
    //this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .toPromise()
      .then(response => {
        const resp = response.json();
        this.lancamentos = resp.content;
        // const totalRegistros = resp.totalElements;
      })
    //.subscribe(lancamentos => this.lancamentos = lancamentos);

  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });  
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo);
    if (this.grid.first == 0) {
        this.pesquisar();
    } else {
      this.grid.first = 0;
    }
    this.toasty.success('Lançamento excluido com sucesso!');
  }

}
