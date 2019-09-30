import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any){
    let msg: string;

    if (typeof errorResponse === 'string'){//alterar isso
      msg = errorResponse;
    }else{
      msg = 'Erro ao processar serviço remoto. tente novamente.';
    }

    this.toasty.error(msg);
  }
}
