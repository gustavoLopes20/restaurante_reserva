import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class SearchService {

  public local = new EventEmitter;
  
  constructor() { }

  changeLocal(local:any){
    this.local.emit(local);
    console.log(local);
  }

}
