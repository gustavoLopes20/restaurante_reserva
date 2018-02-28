import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class BuscaService {

  constructor() { }

  public local = new EventEmitter;

  changeLocal(local:any){
    this.local.emit(local);
    console.log(local);
  }

}
