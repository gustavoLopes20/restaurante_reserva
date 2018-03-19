import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { LocalizacaoService } from '../localizacao.service';

@Component({
  selector: 'app-buscas',
  templateUrl: './buscas.component.html',
  styleUrls: ['./buscas.component.scss']
})
export class BuscasComponent implements OnInit {

  public lstCidades: Array<any> = [];
  public lstRestaurantes: Array<any> = [];
  public lstCidadesAux: Array<any> = [];

  public active: boolean = false;
  public avancado: boolean = false;
  public load:boolean = true;

  public cidadeAtual: any = { Descricao: "", Uf: "", RID: ""};
  public model: any = { StrBusca: "", Data: "", Horario: "", QtdPessoas: 1 };

  constructor(private serachService: SearchService, private router: Router, private localService:LocalizacaoService) { }

  ngOnInit() { 

    this.lstCidades = [
      { Descricao: "Araxá", Uf: "MG", RID: "city1" },
      { Descricao: "Uberlândia", Uf: "MG", RID: "city2" },
      { Descricao: "Uberaba", Uf: "MG", RID: "city3" },
    ];
    
    this.lstCidades.forEach(c => {
      c.Descricao = c.Descricao.concat("-",c.Uf);
    });
    this.lstCidadesAux = this.lstCidades.slice(0);


    this.localService.localizarUsuario((local) =>{

      this.cidadeAtual = this.lstCidades.find(a => a.Descricao.toUpperCase() === local.CidadeFMT.toUpperCase());

      if(typeof this.cidadeAtual  === "undefined"){
        this.cidadeAtual = this.lstCidades[1];
      }
      this.load = false;
      this.redirecionar(0);
     
    }, (err)=>{
      console.log("Erro:",err.message);
      this.cidadeAtual = this.lstCidades[1];
      this.load = false;
      this.redirecionar(0);
    }); 

  }

  advancedActive() {
    if (!this.avancado)
      this.avancado = true;
    else
      this.avancado = false;
  }

  //buscando por cidades
  serachCitys(event: any) {
    let aux: Array<any> = [];
    let citys: Array<any> = this.lstCidadesAux.slice(0);
    let value: string = '';
    let add: boolean = false;
    value += event.target.value; //event keyUp value

    citys.forEach(cidade => {
      for (let i = 0; i < value.length; i++) {
        if (i < cidade.Descricao.length) {
          if (value[i].toUpperCase() == cidade.Descricao[i].toUpperCase()) {
            add = true;
          } else {
            add = false;
            break;
          }
        } else {
          add = false;
          break;
        }
      }
      if (add) {
        aux.push(cidade);
        add = false;
      }
    });
    this.lstCidades = aux;

    if (value.length == 0)
      this.lstCidades = this.lstCidadesAux.slice(0);
  }

  clickCidades() {
    if (!this.active)
      this.active = true;
    else
      this.active = false;
  }

  selectCidade(cidade: any) {
    this.cidadeAtual = cidade;
    this.clickCidades();
    this.redirecionar(0);
  }

  redirecionar(op: number) {
    switch (op) {
      case 0:
        this.router.navigate(['/Buscas/Cidade/' + this.cidadeAtual.RID]);
      break;
      case 1:
        this.router.navigate(['/Login/']);
      break;
    }
  }


}
