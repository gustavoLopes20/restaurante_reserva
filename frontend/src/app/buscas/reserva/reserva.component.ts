import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  public restaurante:any = { Descricao: "", Endereco: ""};

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.params.subscribe(params => {
      let rid: string = params['RID'];

      if(rid == 'res1'){
        this.restaurante =  { Id: "1", RID: "res1", Descricao: "Prato Fino Restaurante", ImgSrc: "https://photo980x880.mnstatic.com/f8a1120e9e74879167b567dd9fd1224e/restaurante-prato-fino.jpg", Cidade: "city1", Endereco: "R. Dom José Gáspar, 376 - Centro, Araxá - MG, 38183-188", Avalicao: "9,2", Info: "", MesasDisponiveis: [{ Id: "33", Data: "2018-02-27", Horario: "18:00", QtdMaxPessoas: 6, Restaurante: "" }] };
      }else if(rid == 'res2'){
        this.restaurante =  { Id: "2", RID: "res2", Descricao: "Restaurante salão Grill Self Service", ImgSrc: "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000ufEXRMA2/5899c2a8e4b05684419a53b9.jpg&w=620&h=400", Cidade: "city1", Avalicao: "9,2", Endereco: "R. Pres. Olegário Maciel, 291 - Centro, Araxá - MG, 38183-186", Info: "", MesasDisponiveis: [{ Id: "44", Data: "2018-02-28", Horario: "20:00", QtdMaxPessoas: 6, Restaurante: "" }] };
      }

    });
  }

}
