import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { SessaoUsuario, PermissaoUsuario, DATA_SOURCE_COMPONENTS, IComponent } from '../data/dataModels';

@Injectable()
export class AuthGuardAdminService implements CanActivate, CanActivateChild {

  private components: IComponent[] = DATA_SOURCE_COMPONENTS;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      let session: SessaoUsuario = await this.authService.authenticate();
      if (session.Sucesso) {
        if (
          session.PermissoesUser.find(a => a.Component == this.getComponentId('usuarios')) &&
          session.PermissoesUser.find(a => a.Component == this.getComponentId('admin'))
        )
        {
          console.log("ok-> auth-guard-admin");
          resolve(true);
        }
        else {
          this.router.navigate(['/Login']);
          resolve(false);
        }
      } else {
        this.router.navigate(['/Login']);
        resolve(false);
      }
    });
  }

  async canActivateChild() {
    return new Promise<boolean>(async resolve => {
      let session: SessaoUsuario = await this.authService.authenticate();

      if(session.Sucesso){
        if(session.UserNivel == 1 &&
          session.PermissoesUser.find(a => a.Component == this.getComponentId('empresa')) &&
          session.PermissoesUser.find(a => a.Component == this.getComponentId('mesas')) &&
          session.PermissoesUser.find(a => a.Component == this.getComponentId('reservas')) &&
          session.PermissoesUser.find(a => a.Component == this.getComponentId('perfil'))
        )
          resolve(true);
        else{
          this.router.navigate(['/Login']);
          resolve(false);
        }
      }else{
        this.router.navigate(['/Login']);
        resolve(false);
      }
    });
  }

  private getComponentId(componentName: string): number {
    let model = this.components.find(a => a.Descricao.toLowerCase() == componentName.toLowerCase());
    if (model)
      return model.Id;

    return 0;
  }

}
