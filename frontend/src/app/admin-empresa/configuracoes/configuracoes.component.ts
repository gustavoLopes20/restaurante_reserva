import { Component, OnInit } from '@angular/core';
import { SessaoResponseModel } from '../../Data/dataModel';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  public userSession: SessaoResponseModel = new SessaoResponseModel();
  
  constructor(private authService:AuthService)
  {
    this.authService.sessaoUser.subscribe(sessao =>{
       this.userSession = sessao; 
    });
  }

  ngOnInit() {
  }

}
