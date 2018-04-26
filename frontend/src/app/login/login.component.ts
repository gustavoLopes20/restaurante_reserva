import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { LoginResponseModel } from '../data/dataModels';

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
    private dialogService:DialogService,
    private authService:AuthService
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
      this.formulario.reset();
      this.loading = false;
      this.redirectUser(response.UserNivel);
    } else {
      this.dialogService.confirm("Erro!",response.Mensagem);
      this.loading = false;  
      console.error("Erro ->", response.Mensagem);
    }
    
  }

  aplicarLowerCase(str:string){
    str = str.toLowerCase();
    this.formulario.patchValue({ email: str});
  }

  redirectUser(userNivel:number){
    switch(userNivel){
      case 0:
        this.router.navigate(['/Usuarios/User']);
      break;
      case 1:
        this.router.navigate(['/Usuarios/Admin']);
      break;
      case 2:
        this.router.navigate(['/Usuarios/Admin']);
      break;
      default:
        this.router.navigate(['/Login']);
    }
  }

}
