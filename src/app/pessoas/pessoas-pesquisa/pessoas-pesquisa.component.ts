import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', null) grid: any;

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas')
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
        const resp = response.json();
        this.pessoas = resp.content;
        //this.totalRegistros = resp.totalElements;
      })
    //.subscribe(pessoas => this.pessoas = pessoas);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Lançamento excluido com sucesso!');
      }).catch(erro => this.errorHandler.handle(erro));
  }

  alteraStatus(pessoa: any) {
    this.pessoaService.alterarStatus(pessoa.codigo, pessoa.ativo)
      .then(() => {
        if (pessoa.ativo) {
          this.toasty.success('Pessoa ativada com sucesso!');
        } else {
          this.toasty.success('Pessoa desativada com sucesso!');
        }
      }).catch(erro => this.errorHandler.handle(erro));
  }

}
