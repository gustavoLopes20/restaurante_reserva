import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { DataService } from '../Data/data.service';
import { SessaoResponseModel } from '../Data/dataModel';

@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.component.html',
  styleUrls: ['./admin-empresa.component.scss']
})
export class AdminEmpresaComponent implements OnInit {

  public userSession: SessaoResponseModel = new SessaoResponseModel();
  public routing: Array<any> = [];
  public autenticado: boolean = false;

  private clickMenu: boolean = false;
  private clickBtUser:boolean = false;

  constructor(
    private dataService:DataService,
    private servidor: ApiService,
    public authService:AuthService
  ) {
    this.authService.sessaoUser.subscribe(sessao => {
      this.userSession = sessao;
    });
  }

  ngOnInit() {
    
    // array de rotas
    this.routing = [
      { Router: '/Admin/Estabelecimentos', IconClass: 'fa fa-building-o', Descricao: 'Estabelecimentos'},
      { Router: '/Admin/Mesas', IconClass: 'fa fa-th-large', Descricao: 'Mesas' },
      { Router: '/Admin/Config', IconClass: 'fa fa-cog', Descricao: 'Configurações'},
      { Router: '', IconClass: 'fa fa-sign-out', Descricao: 'Sair' }
    ];
  }

  onClickMenu(option:boolean) {
    this.clickMenu = option;
  }

  onClickBtUser(){
    this.clickBtUser = !this.clickBtUser ? true : false;
  }
  aplicarCss(option:number){
    switch(option){
      case 1:
        return {
          'active-lst': this.clickMenu
        }
      case 2:
        return {
          'active-nav': this.clickBtUser
        } 
    }
  }



}
