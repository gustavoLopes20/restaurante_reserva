import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Data/data.service';
import { CidadeBr, Busca, Empresa, IResponse } from '../../Data/dataModel';
import { BuscasService } from '../buscas.service';
import { LocalizacaoService } from '../../localizacao.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  public cidadeAtual: CidadeBr = { Nome: '', Id: 0, Estado: '', EstadoSigla: '', RID: '' };
  private _lstRestaurantes: Array<Empresa> = [];
  public lstRestaurantes: Array<Empresa> = [];
  public encontrado: IResponse = { Sucesso: false, Mensagem: '' };
  public qtdSearch: number = 0;

  constructor(
    private activatedRouter: ActivatedRoute,
    private dataService: DataService,
    private buscasService: BuscasService,
    private localService: LocalizacaoService
  ) {
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {

      this.dataService.cidadesBr.subscribe(cidades => {

        let city: CidadeBr = cidades.find(a => a.RID == params.cidade);
        if (city) {

          this.cidadeAtual = city;
          this.encontrado = { Sucesso: true, Mensagem: '' };
          this.dataService.lstRestaurantes.subscribe(restaurantes =>{

            this._lstRestaurantes = this.filtrarEmpresas(city.Nome, restaurantes);

            if(params.restaurante){ //filtrando por nome de restaurante
              let lst:Array<Empresa> = this.dataService.filtrarData(1, params.restaurante, this._lstRestaurantes);
              if(lst.length){
                this.encontrado = { Sucesso: true, Mensagem: '' };
                this.lstRestaurantes = lst;
              }else{
                this.encontrado = { Sucesso: false, Mensagem: 'Nenhum restaurante encontrado.' };
                this.lstRestaurantes = [];
              }
            }else{//filtrando por cidade
              let lst:Array<Empresa> = this._lstRestaurantes.slice(0);
              if(lst.length){
                this.encontrado = { Sucesso: true, Mensagem: '' };
                this.lstRestaurantes = lst;
              }else{
                this.encontrado = { Sucesso: false, Mensagem: 'Nenhum restaurante encontrado.' };
                this.lstRestaurantes = [];
              }
            } 
                                         
          });
        }
      });
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
