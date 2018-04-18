import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataService } from '../../Data/data.service';
import { Empresa, SessaoResponseModel, Usuario, DefaultResponseModel, EstadoBr, CidadeBr } from '../../Data/dataModel';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { ValidaDocumentosService } from '../../valida-documentos.service';


@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.scss']
})
export class EstabelecimentosComponent implements OnInit {

  public sessionUser: SessaoResponseModel = new SessaoResponseModel();
  public userOnline: Usuario = new Usuario();

  //public lstEmpresas: Array<Empresa> = [];
  public lstEstados: Array<EstadoBr> = [];
  public lstCidades: Array<CidadeBr> = [];
  private _lstCidades: Array<CidadeBr> = [];

  public salvando: boolean = false;

  public formulario: FormGroup;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private servidor: ApiService,
    private formBuilder: FormBuilder,
    private validaDocumentosService:ValidaDocumentosService
  ) {
    this.authService.sessaoUser.subscribe(sessao => {
      if (sessao.Sucesso)
        this.userOnline.Id = sessao.UserId;
    });
  }

  ngOnInit() {
    //form config
    this.formulario = this.formBuilder.group({
      nomeFantasia: [{ value: null, disabled: true}, [Validators.minLength(3)]],
      razaoSocial: [{ value: null, disabled: true}, [Validators.required, Validators.minLength(3)]],
      cnpj: [{ value: null, disabled: true}, Validators.required],
      codEmpresa: [{ value: null, disabled: true}],
      cep: [{ value: null, disabled: true}, Validators.required],
      rua: [{ value: null, disabled: true}, Validators.required],
      numero: [{ value: null, disabled: true}, Validators.required],
      complemento: [{ value: null, disabled: true}],
      bairro: [{ value: null, disabled: true}, Validators.required],
      estado: [{ value: null, disabled: true}, Validators.required],
      cidade: [{ value: null, disabled: true}, Validators.required],
      email: [{ value: null, disabled: true}, Validators.email],
      telefone: [{ value: null, disabled: true}, Validators.required],
    });

    //carregando estados e cidades
    this.dataService.estadosBr.subscribe(lst => {
      this.lstEstados = lst;
    });
    this.dataService.cidadesBr.subscribe(lst => {
      this._lstCidades = lst;
    });
  }

  //event onChange - carregando cidades
  onChangeCidades(event: any) : void {
    let value: string = '';
    value += event.target.value;  //event change value estadoId
    let _filtro: Array<CidadeBr> = this._lstCidades.filter(cidade => {
      if (cidade.Estado == value)
        return true;
      else
        return false;
    });
    this.lstCidades = _filtro;
  }

  //event onKeyUp - formatando document: CPF ou CNPJ
  onKeyUpFormatDoc(event:any) : void{
    let value: string = '';
    value += event.target.value;
    let cnpjFMT:string = this.validaDocumentosService.formatarDocumento(value);
    this.formulario.patchValue({ cnpj: cnpjFMT});  
  }

  getCidade(cidadeRID:string) : string{
    return this._lstCidades.find(a => a.RID == cidadeRID).Nome;
  }
  getEstado(estadoRID:string) : string{
    return this.lstEstados.find(a => a.RID == estadoRID).Sigla;
  }

  async saveItem() {
    if (this.formulario.valid) {

      let model = {
        NomeFantasia: this.formulario.get('nomeFantasia').value,
        RazaoSocial: this.formulario.get('razaoSocial').value,
        CodEmpresa: this.formulario.get('codEmpresa').value,
        Cnpj: this.formulario.get('cnpj').value,
        Cep: this.formulario.get('cep').value,
        Rua: this.formulario.get('rua').value,
        Num: this.formulario.get('numero').value,
        Complemento: this.formulario.get('complemento').value,
        Bairro: this.formulario.get('bairro').value,
        Estado: this.getEstado(this.formulario.get('estado').value),
        Cidade: this.getCidade(this.formulario.get('cidade').value),
        Telefone: this.formulario.get('telefone').value,
        Email: this.formulario.get('email').value,
        UsuarioId: this.userOnline.Id,
      };
      const response: DefaultResponseModel = await this.servidor.chamarApi('api/Empresas', model, true);
      
      if (response.Sucesso) {
        alert(response.Mensagem);
      } else {
        alert(response.Mensagem);
      }
    }else{
      alert('Fomulário Inválido');
    }
    this.salvando = false;
  }

  newItem() : void {
    this.formulario.reset();
    this.formulario.enable();
  }
  resetItem(): void {
    this.formulario.reset();
    this.formulario.disable();
  }

  editItem(item: Empresa) : void {
  }

  delItem(): void {

  }




}
