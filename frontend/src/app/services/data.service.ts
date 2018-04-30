import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../services/auth.service';
import { Mesa, Empresa, EstadoBr, CidadeBr, IComponent, SessaoUsuario } from '../data/dataModels';

@Injectable()
export class DataService {

  private empresas: Array<Empresa> = [];
  private mesas: Array<Mesa> = []
  private estadosBr: Array<EstadoBr> = [];
  private cidadesBr: Array<CidadeBr> = [];
  private components: Array<IComponent> = [];

  constructor(
    private servidor: ApiService,
    private authService: AuthService
  ) {
  }

  public getEstadosBr(update: boolean = false): Promise<EstadoBr[]> {
    return new Promise<EstadoBr[]>(async resolve => {
      if (!this.estadosBr.length || update)
        this.estadosBr = await this.servidor.getUri("assets/Data/estadosBr.json");

      resolve(this.estadosBr);
    });
  }
  public getCidadesBr(update: boolean = false): Promise<CidadeBr[]> {
    return new Promise<CidadeBr[]>(async resolve => {
      if (!this.cidadesBr.length || update)
        this.cidadesBr = await this.servidor.getUri("assets/Data/cidadesBr.json");

      resolve(this.cidadesBr);
    });
  }

  public getCidade(option: number, cidade: string): string {
    if (this.estadosBr.length) {
      switch (option) {
        case 1:
          return this.cidadesBr.find(a => a.RID == cidade).Nome;
        case 2:
          return this.cidadesBr.find(a => a.Nome == cidade).RID;
      }
    }
    return null;
  }
  public getEstado(option: number, estado: string): string {
    if (this.estadosBr.length) {
      switch (option) {
        case 1:
          return this.estadosBr.find(a => a.RID == estado).Sigla;
        case 2:
          return this.estadosBr.find(a => a.Sigla == estado).RID;
      }
    }
    return null;
  }

  public getEmpresas(option: number, str?: string, update: boolean = false): Promise<Empresa[]> {
    return new Promise<Empresa[]>(async resolve => {
      switch (option) {
        case 1:
          if (!this.empresas.length || update) {
            this.empresas = await this.servidor.chamarApi("api/Empresas", null);
          }
          break;
        case 2:
          if (!this.empresas.length || update) {
            let session:SessaoUsuario = await this.authService.authenticate();
            if (session.Sucesso)
              this.empresas = await this.servidor.chamarApi("api/Empresas?user=" +session.UserRID, null);
          }
          break;
      }
      resolve(this.empresas);
    });
  }

  private replaceSpecial(str: string): string {

    str = str.replace(/[ÀÁÂÃ]/, "A");
    str = str.replace(/[àáâã]/, "a");
    str = str.replace(/[ÉÊÈ]/, "E");
    str = str.replace(/[éêè]/, "e");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "ç");
    str = str.replace(/[ÓÒÔÕ]/, "O");
    str = str.replace(/[óòôõ]/, "o");

    return str.replace(/[^a-z 0-9]/gi, '');
  }



  public filtrarEmpresas(str: string, array: Empresa[]): Empresa[] {
    let add: boolean = false;
    str = str.toUpperCase();

    let _filtro: Empresa[] = array.filter(element => {
      for (let i = 0; i < str.length; i++) {
        if (i < element.RazaoSocial.length) {
          if (this.replaceSpecial(str[i]) == this.replaceSpecial(element.RazaoSocial[i].toUpperCase())) {
            add = true;
          } else {
            add = false;
            break;
          }
        } else {
          add = false;
          break;
        }
      }
      if (add)
        return true;
      else
        return false;
    });

    return _filtro;
  }

  public filtrarCidades(str: string, array: CidadeBr[]): CidadeBr[] {
    let add: boolean = false;
    str = str.toUpperCase();

    let _filtro: CidadeBr[] = array.filter(element => {
      for (let i = 0; i < str.length; i++) {
        if (i < element.Nome.length) {
          if (this.replaceSpecial(str[i]) == this.replaceSpecial(element.Nome[i].toUpperCase())) {
            add = true;
          } else {
            add = false;
            break;
          }
        } else {
          add = false;
          break;
        }
      }
      if (add)
        return true;
      else
        return false;
    });

    return _filtro;
  }


}
