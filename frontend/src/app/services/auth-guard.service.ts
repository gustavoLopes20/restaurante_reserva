import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SessaoUsuario, PermissaoUsuario, DATA_SOURCE_COMPONENTS, IComponent } from '../data/dataModels';

@Injectable()
export class AuthGuardService implements CanActivate {

  private components: IComponent[] = DATA_SOURCE_COMPONENTS;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      let session: SessaoUsuario = await this.authService.authenticate();
      if (session.Sucesso) {
        if (
          session.PermissoesUser.find(a => a.Component == this.getComponentId('usuarios'))
        ){
          console.log("ok-> auth-guard");
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

  private getComponentId(componentName: string): number {
    let model = this.components.find(a => a.Descricao.toLowerCase() == componentName.toLowerCase());
    if (model)
      return model.Id;

    return 0;
  }
}
