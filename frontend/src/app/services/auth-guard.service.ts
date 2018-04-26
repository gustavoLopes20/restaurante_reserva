import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService } from './api.service';
import { SessaoUsuario, PermissaoUsuario } from '../data/dataModels';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    private servidor: ApiService,
    private routerActive: ActivatedRoute
  ) {

  }

  async canActivate() {
    let session: SessaoUsuario = await this.authService.authenticate();
    let succss:boolean = false;

    if (session.Sucesso) {
      session.PermissoesUser.forEach(permissao => {
        if (permissao.Component == 3290)
          succss = true;
      });
    }

    if(!succss)
      this.router.navigate(['/Login']);

    return succss;
  }

  async canActivateChild() {
    let session: SessaoUsuario = await this.authService.authenticate();

    if (session.Sucesso) {
      let succss: number = 0;
      switch (session.UserNivel) {
        case 0: // user comum
          session.PermissoesUser.forEach(permissao => {
            if (permissao.Component == 4486)
              succss++;
            else if (permissao.Component == 1456)
              succss++;
            else if (permissao.Component == 7645)
              succss++;
          });
          return succss == 3;
        case 1: // user admin 
          session.PermissoesUser.forEach(permissao => {
            if (permissao.Component == 4486)
              succss++;
            else if (permissao.Component == 1456)
              succss++;
            else if (permissao.Component == 7645)
              succss++;
          });
          return succss == 3;
        case 2: // user development
          session.PermissoesUser.forEach(permissao => {
            if (permissao.Component == 4486)
              succss++;
            else if (permissao.Component == 1456)
              succss++;
            else if (permissao.Component == 7645)
              succss++;
          });
          return succss == 3;
        default:
          return false;
      }
    }
    this.router.navigate(['/Login']);

    return false;
  }

}
