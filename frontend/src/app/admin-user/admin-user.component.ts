import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  public routing: Array<any> = [];

  constructor(public authenticationService: AuthService) { }

  ngOnInit() {
    // this.authenticationService.authenticate(response => {
    //   if (response.sucesso) {
    //     this.routing = [
    //       { Router: '/Buscas', IconClass: 'fa fa-search', Descricao: 'Buscas' },
    //       { Router: '/Admin/Minhas-Reservas', IconClass: 'fa fa-users', Descricao: 'Reservas' },
    //       { Router: '/Admin/Config', IconClass: 'fa fa-cog', Descricao: 'Configurações' }
    //     ];
    //     this.authenticationService.redirect(1);
    //   }else{
    //     this.authenticationService.redirect(4);//redirecionar para pagina de login 
    //   }
    // }, err => {
    //   this.authenticationService.redirect(4);
    //   throw err;
    // });
  }

}
