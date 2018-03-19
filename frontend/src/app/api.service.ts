import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs, Headers, BaseRequestOptions, RequestOptions } from '@angular/http'

import { environment } from '../environments/environment';

import 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor(private http: Http) { 
    
  }

  public mapUrl(url: string) : string {

    if(!url.startsWith('/')) {
      url = '/' + url;
    }

    var prodUrl = window.location.protocol + '//' + window.location.host;
    var devUrl = 'http://localhost:5000';
    var apiUrl = '';

    if(environment.production) {
      apiUrl = prodUrl;
    } else {
      apiUrl = devUrl;
    }

    url = apiUrl + url;
    return url;
  }

  lancarError(erro) {
    throw erro;
 }

  async chamarApi(api:string, postData:Object){
    
    var access_token = localStorage.getItem('access_token');
    var token_terminal = localStorage.getItem('terminal_id');

    var options:RequestOptionsArgs = { 
      url: this.mapUrl(api),
      headers: new Headers({
        'access_token': access_token,
        'terminal_id': token_terminal,
        //'Origin': location.protocol + '//' + location.host,
      })
    };

    if(postData) {
      options.method = 'POST';
      options.body = postData;

      let response;

      try{
       response = await this.http.post(this.mapUrl(api), postData, options).toPromise();

       return response;
       
      }catch(e){
        this.lancarError(e);
      }
      return response;
    } else {
      options.method = 'GET';
      let response;

      try{
        response = await this.http.get(this.mapUrl(api), options).toPromise();
      }catch(e){
        this.lancarError(e);
      }
      return response;
    }
  }

  async getApi(uri:string){ 
    const requeste:any = await this.http.get(uri).toPromise();
    return  JSON.parse(requeste._body); 
  }

}
