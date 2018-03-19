import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscasComponent } from '../buscas.component';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.scss']
})
export class CidadesComponent implements OnInit {
  
  public lista: Array<any> = [];
  public lstAux: Array<any> = [];
  public lstCategoria: Array<any> = [];

  public model: any = { };
  public cidadeAtual: any = { Descricao: "" };

  public qtdSearch: number = 0;

  public click:boolean = false;

  constructor(private router: ActivatedRoute, private appComponent:BuscasComponent) { }

  ngOnInit() {
    this.router.params.subscribe(params => {

      let local:string = params['RID'];

      let lstCidades: any = [
        { Descricao: "Araxá", Uf: "MG", RID: "city1" },
        { Descricao: "Uberlândia", Uf: "MG", RID: "city2" },
        { Descricao: "Uberaba", Uf: "MG", RID: "city3" },
      ];

      let city:any = lstCidades.find(a => a.RID == local);
      city.Descricao = city.Descricao.concat("-",city.Uf);
      
      if(typeof city  != "undefined"){
        this.cidadeAtual = city;

        switch(city.RID){
            case 'city1':
              this.lista = [
                { Id: "1", RID: "res1", Descricao: "Prato Fino Restaurante", ImgSrc: "https://photo980x880.mnstatic.com/f8a1120e9e74879167b567dd9fd1224e/restaurante-prato-fino.jpg", Cidade: "city1", Endereco: "R. Dom José Gáspar, 376 - Centro, Araxá - MG, 38183-188", Avalicao: "9,2", Info: "", MesasDisponiveis: [{ Id: "33", Data: "2018-02-27", Horario: "18:00", QtdMaxPessoas: 6, Restaurante: "" }] },
                { Id: "2", RID: "res2", Descricao: "Restaurante salão Grill Self Service", ImgSrc: "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000ufEXRMA2/5899c2a8e4b05684419a53b9.jpg&w=620&h=400", Cidade: "city1", Avalicao: "9,2", Endereco: "R. Pres. Olegário Maciel, 291 - Centro, Araxá - MG, 38183-186", Info: "", MesasDisponiveis: [{ Id: "44", Data: "2018-02-28", Horario: "20:00", QtdMaxPessoas: 6, Restaurante: "" }] },
              ];
            break;

            default:
              this.lista = [];
        }
        this.qtdSearch = this.lista.length;
      }
    });
  }

  clickLista(){
    if(!this.click)
      this.click = true;
    else
      this.click = false;  
  }

}
