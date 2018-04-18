import { Injectable} from '@angular/core';
import { Busca } from '../Data/dataModel';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../Data/data.service';

@Injectable()
export class BuscasService {
  
  private _buscaModel: BehaviorSubject<Busca> = new BehaviorSubject(new Busca());
  public buscaModel: Observable<Busca> = this._buscaModel.asObservable();

  constructor(private dataService:DataService)
  {}

  public changeInputBusca(model:Busca){
    this._buscaModel.next(model);//atualizando a variavel
  }

  private replaceSpecial(str:string){
    
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

}
