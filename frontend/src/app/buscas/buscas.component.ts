import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizacaoService } from '../localizacao.service';
import { AuthService } from '../auth.service';
import { SessaoResponseModel, CidadeBr } from '../Data/dataModel';
import { DataService } from '../Data/data.service';
import { Empresa, Busca } from '../Data/dataModel';
import { BuscasService } from './buscas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscas',
  templateUrl: './buscas.component.html',
  styleUrls: ['./buscas.component.scss']
})
export class BuscasComponent implements OnInit {

  private _lstCidades: Array<CidadeBr> = [];
  public lstCidades: Array<CidadeBr> = [];

  private _lstRestaurantes: Array<Empresa> = [];
  public lstRestaurantes: Array<Empresa> = [];

  public avancado: boolean = false;
  public load: boolean = false;
  public clickLst: boolean = false;
  private _localAtualRID:string = '';

  public userOnline: SessaoResponseModel = new SessaoResponseModel();
  public formulario: FormGroup;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private localService: LocalizacaoService,
    private formBuilder: FormBuilder
  ) {
    this.dataService.carregarEmpresas(1);
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      StrRestaurante: [null],
      LocalName: [null, Validators.required ],
      Data: [null],
      Horario: [null],
      QtdPessoas: [1],
    });
    //this.router.navigate(['/Buscas/Home']);

    this.dataService.cidadesBr.subscribe(cidades => {
      this._lstCidades = cidades;
    });
    
    this.dataService.lstRestaurantes.subscribe(restaurantes => {
      this._lstRestaurantes = restaurantes;
    });

    // recebendo dados de sessao do usuario
    this.authService.sessaoUser.subscribe(session => {
      this.userOnline = session;
    });

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
        this.router.navigate(['/Admin/']);
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
    this.lstCidades = this.dataService.filtrarData(2, str, this._lstCidades);
    this.clickLst = true;
  }

  onKeyUpRestaurante(){
    let str:string = String(this.formulario.get('StrRestaurante').value);//replace(/[ ]/,"-")
    this.router.navigate(['/Buscas/Restaurantes'], { queryParams: { cidade: this._localAtualRID, restaurante: str } });
  }



}
 //this.router.navigate(['/Buscas/Restaurantes'], { queryParams: { cidade: 1608 } });