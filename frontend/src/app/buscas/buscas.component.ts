import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BuscasService } from './buscas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadeBr, Empresa, SessaoUsuario } from '../data/dataModels';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-buscas',
  templateUrl: './buscas.component.html',
  styleUrls: ['./buscas.component.scss']
})
export class BuscasComponent implements OnInit {

  private _lstCidades: Array<CidadeBr> = [];
  public lstCidades: CidadeBr[] = [];

  private _lstRestaurantes: Array<Empresa> = [];
  public lstRestaurantes: Array<Empresa> = [];

  public avancado: boolean = false;
  public load: boolean = false;
  public clickLst: boolean = false;
  private _localAtualRID:string = '';

  public sessionUser: SessaoUsuario = new SessaoUsuario();
  public formulario: FormGroup;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  async ngOnInit() {
    this.formulario = this.formBuilder.group({
      StrRestaurante: [null],
      LocalName: [null, Validators.required ],
      Data: [null],
      Horario: [null],
      QtdPessoas: [1],
    });
    //this.router.navigate(['/Buscas/Home']);

    this._lstCidades = await this.dataService.getCidadesBr();
    this._lstRestaurantes = await this.dataService.getEmpresas(1);

    // recebendo dados de sessao do usuario
    this.sessionUser = await this.authService.authenticate();
  }

  //click busca avancanda
  advancedActive() {
    this.avancado = !this.avancado ? true :  false;
  }

  redirecionar(option: number) {
    switch (option) {
      case 0:
        this.router.navigate(['/Buscas/Restaurantes']);
      break;
      case 1:
        this.router.navigate(['/Login/']);
      break;
      case 2:
        this.router.navigate(['/AdminEmpresa/']);
      break;
    }
  }

  onClickCidades(model: CidadeBr) {
    this.formulario.patchValue({ LocalName: model.Nome });
    this.formulario.enable();
    this.lstCidades = [];
    this.clickLst = false;
    this._localAtualRID = model.RID;
    this.router.navigate(['/Buscas/Restaurantes'], { queryParams: { cidade: model.RID } });
  }

  onKeyUpCidades() {
    let str:string = String(this.formulario.get('LocalName').value).toUpperCase();
    this.lstCidades = this.dataService.filtrarCidades(str, this._lstCidades);
    this.clickLst = true;
  }

  onKeyUpRestaurante(){
    let str:string = String(this.formulario.get('StrRestaurante').value);//replace(/[ ]/,"-")
    this.router.navigate(['/Buscas/Restaurantes'], { queryParams: { cidade: this._localAtualRID, restaurante: str } });
  }



}
 //this.router.navigate(['/Buscas/Restaurantes'], { queryParams: { cidade: 1608 } });