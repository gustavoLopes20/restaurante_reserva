import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class LocalizacaoService {

  constructor(private apiService: ApiService) { }

  localizarUsuario(sucesso, falha) {

    let local: any = { Cidade: "", Uf: "" };
    let localFMT: any = { Cidade: "", Uf: "" };

    if (window.navigator && window.navigator.geolocation) {
      let geolocation = window.navigator.geolocation;

      geolocation.getCurrentPosition(async (posicao) => {

        let latitude: number = posicao.coords.latitude;
        let longitude: number = posicao.coords.longitude;
        let encontrado1: boolean = false;
        let encontrado2: boolean = false;

        let response = await this.apiService.getApi("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude);

        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let b = 0; b < response.results[0].address_components[i].types.length; b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (response.results[0].address_components[i].types[b] == "administrative_area_level_1") {
              local.Uf = response.results[0].address_components[i];
              encontrado1 = true;
            }
            if (response.results[0].address_components[i].types[b] == "administrative_area_level_2") {
              local.Cidade = response.results[0].address_components[i];
              encontrado2 = true;
            }

            if (encontrado1 && encontrado2)
              break;
          }
        }
        //city data

        localFMT = {
          Cidade: local.Cidade.short_name,
          Uf: local.Uf.short_name,
          CidadeFMT: local.Cidade.short_name.concat('-', local.Uf.short_name)
        };

        if (sucesso)
          sucesso(localFMT);

      }, (err) => {
        if (falha)
          falha(err);

      });

    } else {
      if (falha)
        falha({ message: 'Geolocalização não suportada em seu navegador.' });
    }

  }

}
