import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { SessaoResponseModel, LoginResponseModel } from './Data/dataModel';

@Injectable()
export class AuthService {
  
  private _sessaoUser: BehaviorSubject<SessaoResponseModel> = new BehaviorSubject(new SessaoResponseModel());
  public sessaoUser: Observable<SessaoResponseModel> = this._sessaoUser.asObservable();

  constructor(private router: Router, private servidor: ApiService)
  {
    this.authenticate();
  }

  public logout(option:number = 0) {
    switch(option){
      case 1:
          if (confirm("Deseja realmente sair?")){
            localStorage.removeItem('access_token');
            this.router.navigate(['/Login']);
          }
      break;
      default:
        localStorage.removeItem('access_token');
    }
  }

  public async authenticate(){
    let token: string = localStorage.getItem("access_token");
    if(token){
      if(this._sessaoUser.getValue().Token != token){
        let sec:SessaoResponseModel = await this.servidor.chamarApi('api/acesso/sessoes',null,true);
        this._sessaoUser.next(sec); 
      }
    }else
      this._sessaoUser.next(new SessaoResponseModel());
      
    return this._sessaoUser.getValue();
  }



}
