import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Empresa, Mesa, SessaoUsuario, DefaultResponseModel } from '../../../data/dataModels';
import { DataService } from '../../../services/data.service';

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
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { }

  
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      numeroMesa: [null, Validators.required],
      qtdMaxPessoas: [null, Validators.required], 
      dataDisponivel: [null, Validators.required],
      horarioDisponivel: [null, Validators.required],
      empresaId: [null, Validators.required]
    });
    this.getEmpresas(); 
  }


  async getEmpresas(){
    let session:SessaoUsuario = await this.authService.authenticate();
    if(session.Sucesso)
      this.lstEstab = await this.dataService.getEmpresas(2, session.UserRID);
    else
      this.lstEstab = [];  
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
