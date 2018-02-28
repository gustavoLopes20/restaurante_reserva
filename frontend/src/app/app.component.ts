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
    this.cidadeAtual = this.lstCidades[0];
    this.router.navigate(['/Search/'+this.cidadeAtual.RID]);
  }

  clickCidades(){
    if(!this.active)
     this.active = true;
    else
      this.active = false; 
  }
  selectCidade(cidade:any){
    this.cidadeAtual = cidade;
    this.clickCidades();
    this.router.navigate(['/Search/'+this.cidadeAtual.RID]);
  }

}
