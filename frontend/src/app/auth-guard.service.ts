import { Injectable } from '@angular/core';
import { CanActivate,  CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SessaoResponseModel } from './Data/dataModel';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router:Router) 
  { }

  async canActivate(){
    let sec:SessaoResponseModel = await this.authService.authenticate();
    if(!sec.Sucesso)
      this.router.navigate(['/Login']);
      
    return sec.Sucesso;  
  }

  async canActivateChild(){
    let sec:SessaoResponseModel = await this.authService.authenticate();
    if(!sec.Sucesso)
      this.router.navigate(['/Login']);
      
    return sec.Sucesso;  
  }

}
