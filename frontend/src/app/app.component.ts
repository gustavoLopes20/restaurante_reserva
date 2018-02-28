import { Component } from '@angular/core';
import { BuscaService } from './busca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public lstCidades:Array<any> = [];
  public lstCidadesAux:Array<any> = [];
  public active:boolean = false;
  public cidadeAtual:any = {};

  constructor(private local:BuscaService, private router:Router){}

  ngOnInit(){
    //dados de exemplo
    this.lstCidades = [
      { Descricao: "Araxá", RID: "c1"},
      { Descricao: "Uberlândia", RID: "c2"},
      { Descricao: "Uberaba", RID: "c3"},
    ];
    this.lstCidadesAux = this.lstCidades.slice(0);
    this.cidadeAtual = this.lstCidades[0];
    this.router.navigate(['/Search/'+this.cidadeAtual.RID]);
    
  }
  
  private values:string = '';


  //buscando por cidades
  serachCitys(event:any) {
      let aux:Array<any> = [];
      let citys:Array<any> = this.lstCidadesAux.slice(0);
      let value:string = '';
      let add:boolean = false;
      value += event.target.value; //event keyUp value
      
      citys.forEach( cidade => {
          for(let i = 0; i < value.length; i++){
             if(i < cidade.Descricao.length){
              if(value[i].toUpperCase() == cidade.Descricao[i].toUpperCase()){
                add = true;
               }else{
                 add = false;
                 break;
               }
             }else{
               add = false;
               break;
             }
          }
          if(add){
            aux.push(cidade);
            add = false;
          }
      });
      this.lstCidades = aux;

      if(value.length == 0)
        this.lstCidades = this.lstCidadesAux.slice(0);
  }


  clickCidades(){
    if(!this.active)
     this.active = true;
    else
      this.active = false; 
  }

  //redirecionar
  selectCidade(cidade:any){
    this.cidadeAtual = cidade;
    this.clickCidades();
    this.router.navigate(['/Search/'+this.cidadeAtual.RID]);
  }

}
