import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { SessaoUsuario, DataRoute } from '../data/dataModels';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  public userSession: SessaoUsuario = new SessaoUsuario();
  public routing: Array<DataRoute> = [];

  private clickMenu: boolean = false;
  private clickBtUser: boolean = false;

  constructor(
    private dataService: DataService,
    private servidor: ApiService,
    public authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.userSession = await this.authService.authenticate();
    if(this.userSession.Sucesso){
      switch(this.userSession.UserNivel){
        case 0:
          this.routing = DATA_SOURCE_ROUTES_USER;
        break;
        case 1:
          this.routing = DATA_SOURCE_ROUTES_ADMIN;
        break;
        case 2:
          this.routing = DATA_SOURCE_ROUTES_ADMIN;
        break;
        default:
          this.routing = [];
      }
    }
  }

  onClickMenu(option: boolean) {
    this.clickMenu = option;
  }

  onClickBtUser(active?:boolean) {
    this.clickBtUser = !this.clickBtUser ? true : false;
    if(typeof active != "undefined")
      this.clickBtUser = active;
  }

  exit(){
    this.onClickBtUser();
    this.authService.logout(1);
  }

  aplicarCss(option: number) {
    switch (option) {
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
const DATA_SOURCE_ROUTES_ADMIN:DataRoute[] = [
  { Descricao: 'Empresa', Link: '/Usuarios/Admin/Empresa', Iclass: 'fa fa-building-o', Ativo: true },
  { Descricao: 'Mesas', Link: '/Usuarios/Admin/Mesas', Iclass: 'fa fa-th-large', Ativo: true },
  { Descricao: 'Reservas', Link: '/Usuarios/Admin/Reservas', Iclass: 'fa fa-cutlery', Ativo: true },
  { Descricao: 'Perfil', Link: '/Usuarios/Admin/Perfil', Iclass: 'fa fa-user', Ativo: false },
];
const DATA_SOURCE_ROUTES_USER:DataRoute[] = [
  { Descricao: 'Reservas', Link: '/Usuarios/User/Reservas', Iclass: 'fa fa-cutlery', Ativo: true },
  { Descricao: 'Perfil', Link: '/Usuarios/User/Perfil', Iclass: 'fa fa-user', Ativo: false },
];