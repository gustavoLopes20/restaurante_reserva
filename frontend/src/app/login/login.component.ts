import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { LoginResponseModel, DefaultResponseModel, IResponse } from '../Data/dataModel';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading: boolean = false;
  public formulario: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private servidor: ApiService,
    private formBuilder: FormBuilder,
    private dialogService:DialogService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(8)]],
    }); 
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;

    let response: LoginResponseModel = await this.servidor.chamarApi('api/acesso/login/', this.formulario.value, true);

    if (response.Sucesso) {
      localStorage.setItem("access_token", response.Token);
      this.router.navigate(['/Admin']);
      this.formulario.reset();
      this.loading = false;
    } else {
      this.dialogService.confirm("Erro!",response.Mensagem+" Deseja limpar o formulário?").subscribe(res =>{
        if(res)
          this.formulario.reset();

        this.loading = false;  
      });
      console.error("Erro ->", response.Mensagem);
    }
    
  }

  private varificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  private varificaValid(campo: string) {
    return this.formulario.get(campo).valid;
  }
  aplicaCss(campo: string) {
    return {
      'has-error': this.varificaValidTouched(campo),
      'has-valid': this.varificaValid(campo),
    }
  }

}
