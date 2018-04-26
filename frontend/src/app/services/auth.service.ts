import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { DialogService } from './dialog.service';
import { SessaoUsuario } from '../data/dataModels';

@Injectable()
export class AuthService {
  
  private sessaoUser:SessaoUsuario = new SessaoUsuario();
  private abrirNovaJanela:boolean = true;
  private autorizado:boolean;

  constructor(
    private router: Router,
    private servidor: ApiService,
    private dialogService:DialogService
  )
  {
    this.authenticate(); 
  }

  

  public logout(option:number = 0) {
    switch(option){
      case 1:
        if(this.abrirNovaJanela){
          this.abrirNovaJanela = false;
          this.dialogService.confirm("Mensagem","Deseja realmente sair?").subscribe(res =>{
            if (typeof res != "undefined" && !res){
              localStorage.removeItem('access_token');
              this.router.navigate(['/Login']);
            }else
              this.abrirNovaJanela = true;
          });
        }
      break;
      default:
        localStorage.removeItem('access_token');
    }
  }

  public async authenticate(update:boolean = false){
    let token: string = localStorage.getItem("access_token");
    if(token){
      if((this.sessaoUser.Token != token) || update){
        let sec:SessaoUsuario = await this.servidor.chamarApi('api/acesso/sessoes',null,true);
        this.sessaoUser = sec;
      }
    }else
      this.sessaoUser = new SessaoUsuario();

    return this.sessaoUser;
  }

}


