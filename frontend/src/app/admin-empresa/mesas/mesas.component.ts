import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Mesa, DefaultResponseModel } from '../../Data/dataModel';
import { DataService } from '../../Data/data.service';
import { Empresa } from '../../Data/dataModel';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  public lstEstab: Array<Empresa> = [];
  public lstMesas: Array<Mesa> = [];

  public salvando: boolean = false;

  public formulario:FormGroup;

  constructor(
    private dataService:DataService,
    private servidor: ApiService,
    private formBuilder:FormBuilder
  ) { }

  
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      numeroMesa: [null, Validators.required],
      qtdMaxPessoas: [null, Validators.required], 
      dataDisponivel: [null, Validators.required],
      horarioDisponivel: [null, Validators.required],
      empresaId: [null, Validators.required]
    });
  }

  newItem() {

  }

  async saveItem() {

    let response:DefaultResponseModel = await this.servidor.chamarApi('api/Empresas', this.formulario.value, true);

    if(response.Sucesso){
      this.formulario.reset();
    }else{

    }
  }

  editItem(item: Mesa) {
  }
  
  delItem() {

  }

  resetItem() {

  }


}
