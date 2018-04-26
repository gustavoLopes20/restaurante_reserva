import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { DefaultResponseModel } from '../data/dataModels';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {

  public formulario:FormGroup;
  public loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder:FormBuilder,
    public dialogService:DialogService
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
      this.dialogService.confirm("Mensagem",response.Mensagem, false).subscribe(() =>{
        this.router.navigate(['/Login']);
        this.formulario.reset();   
      });
    } else{
      console.error("Erro:",response.Mensagem);
      this.dialogService.confirm("Erro!",response.Mensagem, false);
    }    
    this.loading = false;
  }

  aplicarLowerCase(str:string){
    str = str.toLowerCase();
    this.formulario.patchValue({ email: str});
  }

}
