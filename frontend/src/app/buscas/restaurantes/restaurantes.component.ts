import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscasService } from '../buscas.service';
import { CidadeBr, Empresa, IResponse } from '../../data/dataModels';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  public cidadeAtual: CidadeBr = { Id: 0};
  private _lstRestaurantes: Array<Empresa> = [];
  public lstRestaurantes: Array<Empresa> = [];
  public encontrado: IResponse = { Sucesso: false};
  public qtdSearch: number = 0;

  constructor(
    private activatedRouter: ActivatedRoute,
    private dataService: DataService,
    private buscasService: BuscasService
  ) {
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(async params => {

      let cidades:CidadeBr[] = await this.dataService.getCidadesBr();
      let city: CidadeBr = cidades.find(a => a.RID == params.cidade);

      if(city){
        this.cidadeAtual = city;
        this.encontrado = { Sucesso: true };
        this._lstRestaurantes = await this.dataService.getEmpresas(1);

        if(params.restaurante){ //filtrando por nome de restaurante
          let lst:Array<Empresa> = this.dataService.filtrarEmpresas(params.restaurante, this._lstRestaurantes);
          if(lst.length){
            this.encontrado = { Sucesso: true };
            this.lstRestaurantes = lst;
          }else{
            this.encontrado = { Sucesso: false, Mensagem: 'Nenhum restaurante encontrado.' };
            this.lstRestaurantes = [];
          }
        }else{//filtrando por cidade
          let lst:Array<Empresa> = this._lstRestaurantes.slice(0);
          if(lst.length){
            this.encontrado = { Sucesso: true };
            this.lstRestaurantes = lst;
          }else{
            this.encontrado = { Sucesso: false, Mensagem: 'Nenhum restaurante encontrado.' };
            this.lstRestaurantes = [];
          }
        }
      }
    });
  }

  filtrarEmpresas(cidade:string, lst:Array<Empresa>){
    let _filtro:Array<Empresa> = lst.filter(restaurante=>{
      if(restaurante.Cidade == cidade)
        return true;
      else
        return false;  
    });
    return _filtro;
  }

}
