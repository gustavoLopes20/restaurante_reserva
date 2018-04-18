import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth.service';
import { SessaoResponseModel, Mesa, Empresa, EstadoBr, CidadeBr } from '../Data/dataModel';

@Injectable()
export class DataService {

  private _requestRestaurantes: any = {};
  private _requestMesas: any = {};

  private _lstRestaurantes: BehaviorSubject<Array<Empresa>> = new BehaviorSubject(new Array<Empresa>());
  private _lstMesas: BehaviorSubject<Array<Mesa>> = new BehaviorSubject(new Array<Mesa>());
  public lstRestaurantes: Observable<Array<Empresa>> = this._lstRestaurantes.asObservable();
  public lstMesas: Observable<Array<Mesa>> = this._lstMesas.asObservable();

  private _estadosBr: BehaviorSubject<Array<EstadoBr>> = new BehaviorSubject(new Array<EstadoBr>());
  private _cidadesBr: BehaviorSubject<Array<CidadeBr>> = new BehaviorSubject(new Array<CidadeBr>());
  public estadosBr: Observable<Array<EstadoBr>> = this._estadosBr.asObservable();
  public cidadesBr: Observable<Array<CidadeBr>> = this._cidadesBr.asObservable();

  constructor(private servidor: ApiService, private authService: AuthService) {
    this.carregarEstadosCidades();
    this.requestEmpresasAll(false);
  }

  private async carregarEstadosCidades() {
    if(this._estadosBr.getValue().length == 0 && this._cidadesBr.getValue().length == 0){
      let estados = await this.servidor.getUri("assets/Data/estadosBr.json");
      let cidades = await this.servidor.getUri("assets/Data/cidadesBr.json");
      this._estadosBr.next(estados);
      this._cidadesBr.next(cidades);
    }
  }

  public requestEmpresasAll(update:boolean){
    if(this._lstRestaurantes.getValue().length == 0 || update)
      this._requestRestaurantes = this.servidor.chamarApi("api/Empresas",null);
  }

  public async carregarEmpresas(option:number,str:string = '', update:boolean = false){
    let result:any = {};

    switch(option){
      case 1:
        if(update)
         this.requestEmpresasAll(true);
        
        result = await this._requestRestaurantes;
        this._lstRestaurantes.next(JSON.parse(result._body));
      break;
      case 2:
        this._lstRestaurantes.next(await this.servidor.chamarApi("api/Empresas?user="+str,null, true));
      break;
    }
  }

  private replaceSpecial(str:String){
    
    str = str.replace(/[ÀÁÂÃ]/,"A");
    str = str.replace(/[àáâã]/,"a");
    str = str.replace(/[ÉÊÈ]/,"E");
    str = str.replace(/[éêè]/,"e");
    str = str.replace(/[Ç]/,"C");
    str = str.replace(/[ç]/,"ç");
    str = str.replace(/[ÓÒÔÕ]/,"O");
    str = str.replace(/[óòôõ]/,"o");

    return str.replace(/[^a-z 0-9]/gi,'');
  }

  public filtrarData(option:number, str: string, lst: Array<any>) {
    let add: boolean = false;
    str = str.toUpperCase();

    let _filtro: Array<any> = lst.filter(element => {
      let nome:string = option == 1 ? element.RazaoSocial : element.Nome;

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

