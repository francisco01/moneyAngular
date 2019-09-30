import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandlerService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
  }

  salvar(form: FormControl){
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa cadastrada com sucesso!');
      form.reset();
      this.pessoa = new Pessoa();
    }).catch(erro => this.errorHandle.handle(erro));
  }

}
