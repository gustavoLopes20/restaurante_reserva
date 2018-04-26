import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CidadeBr } from '../data/dataModels';
import { DataService } from './data.service';


@Injectable()
export class LocalizacaoService {

  private lstCidades: Array<CidadeBr> = [];

  private _localizacaoAtual: BehaviorSubject<CidadeBr> = new BehaviorSubject({ Id:0, Nome: '', Estado:'', EstadoSigla: '', RID: ''});
  public localizacaoAtual: Observable<CidadeBr> = this._localizacaoAtual.asObservable();

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {
    // this.dataService.cidadesBr.subscribe(cidades => {
    //   this.lstCidades = cidades;
    //   if (this.lstCidades.length)
    //     this.getLocalizacao();
    // });
  }

  setLocalizacao(cidade:CidadeBr){
    this._localizacaoAtual.next(cidade);
    localStorage.setItem('_locationUser',JSON.stringify(cidade));
  }
  getLocalizacao() {
   
    if (window.navigator && window.navigator.geolocation) {
      let geolocation = window.navigator.geolocation;

      geolocation.getCurrentPosition(async position => {

        let latitude: number = position.coords.latitude;
        let longitude: number = position.coords.longitude;
        let cidade: string = '';

        const response: any = await this.apiService.getUri("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude);

        if (response.status == 'OK') {
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let b = 0; b < response.results[0].address_components[i].types.length; b++) {
              if (response.results[0].address_components[i].types[b] == "administrative_area_level_2") {
                let local = response.results[0].address_components[i];
                cidade = local.long_name;
                break;
              }
            }
          }
          let city: CidadeBr = this.lstCidades.find(a => a.Nome == cidade);
          if (city)
            this.setLocalizacao(city);//atualizar cidade encontrada
          else
            this.setLocalizacao({ Id:0, Nome: '', Estado:'', EstadoSigla: '', RID: ''});
        } else
        this.setLocalizacao({ Id:0, Nome: '', Estado:'', EstadoSigla: '', RID: ''});

      }, err => {
        this.setLocalizacao({ Id:0, Nome: '', Estado:'', EstadoSigla: '', RID: ''});
      });
    } else
      this.setLocalizacao({ Id:0, Nome: '', Estado:'', EstadoSigla: '', RID: ''});
  }

}