import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  titulo: string;
  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.title.setTitle('Edição de Pessoa');
      this.titulo = 'Edição';
    } else {
      this.titulo = 'Novo';
      this.title.setTitle('Nova Pessoa');
    }
  }

  salvar(form: FormControl){
    if (this.titulo === 'Novo'){
      this.adcionarPessoa(form);
    } else {
      this.atualizar(form);
    }
  }

  adcionarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then((pessoaAdd) => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas', pessoaAdd.codigo]);
      }).catch(erro => this.errorHandle.handle(erro));
  }

  atualizar(form: FormControl){
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.toasty.success('Pessoa atualizada com sucesso!');
    }).catch(erro => this.errorHandle.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

}
