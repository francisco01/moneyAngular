import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  result = [];
  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
    console.log("teste");
  }

  login(usuario: string, senha: string){
    this.auth.login(usuario, senha)
    .subscribe(res => {
      //this.result = res.access_token;
      console.log("tokennn", res.access_token);
      this.auth.armazenarToken(res.access_token);
      this.router.navigate(['/lancamentos']);

    });
    // .then(() => {
    //   this.router.navigate(['/lancamentos']);
    // })
    // .catch(erro => {
    //   this.errorHandler.handle(erro);
    // });
  }

}
