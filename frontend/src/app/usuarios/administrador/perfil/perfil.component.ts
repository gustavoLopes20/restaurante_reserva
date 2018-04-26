import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SessaoUsuario } from '../../../data/dataModels';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public userSession: SessaoUsuario = new SessaoUsuario();
  
  constructor(private authService:AuthService)
  {
  }

  async ngOnInit() {
    this.userSession = await this.authService.authenticate();
  }

}
