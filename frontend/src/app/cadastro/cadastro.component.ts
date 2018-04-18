import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { IResponse, DefaultResponseModel } from '../Data/dataModel';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {

  public formulario:FormGroup;
  public loading: boolean = false;
  public response: IResponse = { Sucesso: true, Mensagem: ''};

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      nomeUsuario: [null, [ Validators.required, Validators.minLength(3) ]],
      senha: [null, [ Validators.required, Validators.minLength(8) ]],  
      csenha: [null, [ Validators.required, Validators.minLength(8) ]],
    });
  }

  //salvando dados
  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;

    let response:DefaultResponseModel = await this.apiService.chamarApi('api/acesso/cadastro', this.formulario.value, true);

    if (response.Sucesso) {
      this.response.Sucesso = true;
      this.router.navigate(['/Login']);
      this.formulario.reset();    
    } else {
      this.response.Sucesso = false;
      this.response.Mensagem = response.Mensagem;
      console.error("Erro:",response.Mensagem);   
    }
    this.loading = false;
  }

}
