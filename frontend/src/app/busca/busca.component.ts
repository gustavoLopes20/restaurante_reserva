import { Component, OnInit } from '@angular/core';
import { BuscaService } from '../busca.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  public lista: Array<any> = [];
  public lstAux: Array<any> = [];

  public model: any = { StrRestaurante: "", Data: "", Horario: "", QtdPessoas: 1 };
  public cidadeAtual: any = { Descricao: ""};

  public qtdSearch: number = 0;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.params.subscribe(params => {
      let local: string = params['str'];

      let lstCidades: any = [
        { Descricao: "Araxá", RID: "c1" },
        { Descricao: "Uberlândia", RID: "c2" },
        { Descricao: "Uberaba", RID: "c3" },
      ];


      let city = lstCidades.find(a => a.RID == local);

      if (city) {
        this.cidadeAtual = city;
        if (city.RID == 'c2') {
          this.lista = [
            { Id: "1", RID: "r2", Descricao: "Fazendinha Sabiá - Restaurante", ImgSrc: "https://media-cdn.tripadvisor.com/media/photo-s/0e/4f/4e/34/photo1jpg.jpg", Cidade: "c2", Endereco: "Rua Bolívia, 110 - Tibery Uberlândia", Avalicao: "9,2", MesasDisponiveis: [{ Id: "", Data: "", Horario: "", QtdMaxPessoas: "", Restaurante: "" }] },
          ];
          this.qtdSearch = this.lista.length;
        } else if (city.RID == 'c1') {
          this.lista = [
            { Id: "43", RID: "r1", Descricao: "Prato Fino Restaurante", ImgSrc: "https://photo980x880.mnstatic.com/f8a1120e9e74879167b567dd9fd1224e/restaurante-prato-fino.jpg", Cidade: "c1", Endereco: "R. Dom José Gáspar, 376 - Centro, Araxá - MG, 38183-188", Avalicao: "9,2", Info: "", MesasDisponiveis: [{ Id: "33", Data: "2018-02-27", Horario: "18:00", QtdMaxPessoas: 6, Restaurante: "" }] },
            { Id: "23", RID: "r3", Descricao: "Restaurante salão Grill Self Service", ImgSrc: "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000ufEXRMA2/5899c2a8e4b05684419a53b9.jpg&w=620&h=400", Cidade: "c1", Avalicao: "9,2", Endereco: "R. Pres. Olegário Maciel, 291 - Centro, Araxá - MG, 38183-186", Info: "", MesasDisponiveis: [{ Id: "44", Data: "2018-02-28", Horario: "20:00", QtdMaxPessoas: 6, Restaurante: "" }] },
          ];
          this.qtdSearch = this.lista.length;
        } else {
          this.lista = [];
          this.qtdSearch = this.lista.length;
        }
        let str = JSON.stringify(this.lista);
        this.lstAux = JSON.parse(str);
      }

    });
  }

    //
    // serach(value:string) {
    //   let aux:Array<any> = [];
  
    //   this.lstCidades.forEach( cidade => {
    //       for(let i = 0; i < value.length; i++){
    //          if(value[i].toLocaleUpperCase() == cidade.Descricao[i].toLocaleUpperCase()){
    //             aux.push(cidade);
    //             break;
    //          }
    //       }
    //   });
    //   return aux;
    // }

  //buscando restaurantes
  search(event: Event) {
    event.preventDefault();

    let str = JSON.stringify(this.lstAux);
    let lista: Array<any> = JSON.parse(str);
    let lst: Array<any> = [];

    lista.forEach(restaurante => {
      restaurante.MesasDisponiveis.forEach(mesa => {
        if (this.model.Data != "" && this.model.Horario != "") {
          if (this.model.Data == mesa.Data && this.model.Horario == mesa.Horario) {
            if (!this.existente(restaurante, lst))
              lst.push(restaurante);
          }
        } else if (this.model.Data != "" && this.model.Horario == "") {
          if (this.model.Data == mesa.Data) {
            if (!this.existente(restaurante, lst))
              lst.push(restaurante);
          }
        } else if (this.model.Horario != "" && this.model.Data == "") {
          if (this.model.Horario == mesa.Horario) {
            if (!this.existente(restaurante, lst))
              lst.push(restaurante);
          }
        }
      });
    });
    this.lista = lst;
    this.qtdSearch = this.lista.length;
  }

  //verificando se o item exite na lista
  existente(item: any, lst: Array<any>) {
    let it: any = lst.find(a => a.Id == item.Id);
    if (it)
      return true;
    else
      return false;
  }

}
