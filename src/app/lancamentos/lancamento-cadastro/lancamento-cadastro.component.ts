import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from './../../core/model';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  providers: [MessageService]
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {
      label: 'Receita', value: 'RECEITA'
    },
    {
      label: 'Despesa', value: 'DESPESA'
    }
  ];

  titulo: string;
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  constructor(private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.title.setTitle('Edição de Lançamento');
      this.titulo = 'Edição';
      this.carregarLancamento(codigoLancamento);
    } else {
      this.title.setTitle('Novo Lançamento');
      this.titulo = 'Novo';
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
    .then( lancamento => {
      this.lancamento = lancamento;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias(){
    this.categoriaService.listarTodas()
    .then(categorias => {
      console.log("teste", categorias);
      this.categorias = categorias.map(c => {
        return { label: c.nome , value: c.codigo };
      });
    }).catch(erro => this.errorHandler.handle(erro))
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
    .then(pessoas => {
      console.log("teste 2", pessoas.content);
      this.pessoas = pessoas.content.map( p => {
        return { label: p.nome, value: p.codigo};
      });
    }).catch(erro => this.errorHandler.handle(erro));
  }
  salvar(form: FormControl) {
    if (this.titulo === 'Edição') {
      this.atualizar(form);
    } else {
      this.adcionarLancamento(form);
    }
  }
  adcionarLancamento(form: FormControl){
    this.lancamentoService.salvar(this.lancamento)
    .then((lancamentoAdd) => {
      this.toasty.success('Lançamento adicionado com sucesso!');
      //form.reset();
      //this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdd.codigo]);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.toasty.success('Lançamento atualizado com sucesso!');

    }).catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }


}
