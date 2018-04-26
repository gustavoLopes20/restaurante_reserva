import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../services/auth.service';
import { Mesa, Empresa, EstadoBr, CidadeBr, IComponent } from '../data/dataModels';

@Injectable()
export class DataService {

  private empresas:Array<Empresa> = [];
  private mesas:Array<Mesa> = []
  private estadosBr: Array<EstadoBr> = [];
  private cidadesBr: Array<CidadeBr> = [];
  private components: Array<IComponent> = [];
 
  constructor(
    private servidor: ApiService,
    private authService: AuthService
  ) {
  }

  public async getEstadosBr(update:boolean = false) {
    if (!this.estadosBr.length || update)
      this.estadosBr = await this.servidor.getUri("assets/Data/estadosBr.json");

    return this.estadosBr;
  }
  public async getCidadesBr(update:boolean = false){
    if(!this.cidadesBr.length || update)
      this.cidadesBr = await this.servidor.getUri("assets/Data/cidadesBr.json");
    
    return this.cidadesBr;
  }

  public async getEmpresas(option:number, str?:string, update:boolean = false){
    switch(option){
      case 1:
        if(!this.empresas.length || update)
          this.empresas = await this.servidor.chamarApi("api/Empresas", null, true);

      return this.empresas;
      case 2:
        if(!this.empresas.length || update){
          if(str)
            this.empresas = await this.servidor.chamarApi("api/Empresas?user=" + str, null, true);      
        }
      return this.empresas;  
    }
  }

  private replaceSpecial(str: string) {

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

  public filtrarData(option: number, str: string, lst: Array<any>) {
    let add: boolean = false;
    str = str.toUpperCase();

    let _filtro: Array<any> = lst.filter(element => {
      let nome: string = option == 1 ? element.RazaoSocial : element.Nome;

      for (let i = 0; i < str.length; i++) {
        if (i < nome.length) {
          if (this.replaceSpecial(str[i]) == this.replaceSpecial(nome[i].toUpperCase())) {
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

