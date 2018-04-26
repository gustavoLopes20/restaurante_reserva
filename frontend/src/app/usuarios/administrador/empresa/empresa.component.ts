import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidaDocumentosService } from '../../../services/valida-documentos.service';
import { DialogService } from '../../../services/dialog.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { SessaoUsuario, Empresa, EstadoBr, CidadeBr, DefaultResponseModel, CepResponse } from '../../../data/dataModels';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  private session: SessaoUsuario;
  public model: Empresa = new Empresa();

  public displayedColumns = ['Descricao', 'Cnpj', 'Cidade', 'Estado'];
  public dataSource: Array<Empresa> = [];

  public lstEstados: Array<EstadoBr> = [];
  public lstCidades: Array<CidadeBr> = [];
  private _lstCidades: Array<CidadeBr> = [];

  public loading: boolean = false;
  public btClearFormActive:boolean = false;

  public formulario: FormGroup;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private servidor: ApiService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private validaDocumentosService: ValidaDocumentosService
  ) {

  }

  async ngOnInit() {
    //form config
    this.formulario = this.formBuilder.group({
      nomeFantasia: [{ value: null, disabled: true }, [Validators.minLength(3)]],
      razaoSocial: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]],
      cnpj: [{ value: null, disabled: true }, Validators.required],
      codEmpresa: [{ value: null, disabled: true }],
      cep: [{ value: null, disabled: true }, Validators.required],
      rua: [{ value: null, disabled: true }, Validators.required],
      num: [{ value: null, disabled: true }, Validators.required],
      complemento: [{ value: null, disabled: true }],
      bairro: [{ value: null, disabled: true }, Validators.required],
      estado: [{ value: null, disabled: true }, Validators.required],
      cidade: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: true }],
      telefone: [{ value: null, disabled: true }, Validators.required],
    });

    this.formulario.valueChanges.subscribe(resp=>{
      if(
        (resp.nomeFantasia != null && resp.nomeFantasia.length) ||
        (resp.razaoSocial != null && resp.razaoSocial.length) ||
        (resp.cnpj != null && resp.cnpj.length) ||
        (resp.codEmpresa != null && resp.codEmpresa.length) ||
        (resp.cep != null && resp.cep.length) ||
        (resp.rua != null && resp.cep.rua) ||
        (resp.num != null) ||
        (resp.complemento != null && resp.complemento.length) ||
        (resp.bairro != null && resp.bairro.length) ||
        (resp.cidade != null && resp.cidade.length) ||
        (resp.estado != null && resp.estado.length) ||
        (resp.email != null && resp.email.length) ||
        (resp.telefone != null && resp.telefone.length)
      )
        this.btClearFormActive = true;
      else
        this.btClearFormActive = false;
    });

    this.lstEstados = await this.dataService.getEstadosBr();
    this._lstCidades = await this.dataService.getCidadesBr();
    this.session = await this.authService.authenticate();
    
    if(this.session.Sucesso)
      this.dataSource = await this.dataService.getEmpresas(2, this.session.UserRID);

  }

  setModel(option: number, item?: Empresa) {
    switch (option) {
      case 1:
        this.model.NomeFantasia = this.formulario.get('nomeFantasia').value;
        this.model.RazaoSocial = this.formulario.get('razaoSocial').value;
        this.model.CodEmpresa = this.formulario.get('codEmpresa').value;
        this.model.Cnpj = this.formulario.get('cnpj').value;
        this.model.Cep = this.formulario.get('cep').value;
        this.model.Rua = this.formulario.get('rua').value;
        this.model.Num = Number(this.formulario.get('num').value);
        this.model.Complemento = this.formulario.get('complemento').value;
        this.model.Bairro = this.formulario.get('bairro').value;
        this.model.Estado = this.getEstado(1, this.formulario.get('estado').value);
        this.model.Cidade = this.getCidade(1, this.formulario.get('cidade').value);
        this.model.Telefone = this.formulario.get('telefone').value;
        this.model.Email = this.formulario.get('email').value;
        this.model.UsuarioId = Number(this.session.UserId);
        break;
      case 2:
        if (item != null)
          this.model.Id = item.Id;
      break;
      case 3:
        this.model = new Empresa();
      break;
    }
  }

  //event onChange - carregando cidades
  onChangeCidades(value: string): void {
    let _filtro: Array<CidadeBr> = this._lstCidades.filter(cidade => {
      if (cidade.Estado == value)
        return true;
      else
        return false;
    });
    this.lstCidades = _filtro;
  }

  //event onKeyUp - formatando document: CPF ou CNPJ
  onKeyUpFormatDoc(value:string): void {
    this.formulario.patchValue({ cnpj: this.validaDocumentosService.cnpjFMT(value) });
  }
  onKeyUpFormatTell(value:string) : void{
    this.formulario.patchValue({telefone : this.validaDocumentosService.telefoneFMT(value) });
  }

  getCidade(option: number, cidade: string): string {
    switch (option) {
      case 1:
        return this._lstCidades.find(a => a.RID == cidade).Nome;
      case 2:
        return this._lstCidades.find(a => a.Nome == cidade).RID;
    }
  }
  getEstado(option: number, estado: string): string {
    switch (option) {
      case 1:
        return this.lstEstados.find(a => a.RID == estado).Sigla;
      case 2:
        return this.lstEstados.find(a => a.Sigla == estado).RID;
    }
  }

  openDialig(title:string, mensagem:string) {
    this.dialogService.confirm(title, mensagem, false);
  }

  async saveItem() {
    this.loading = true;
    if (this.formulario.valid) {
      this.setModel(1);
      const response: DefaultResponseModel = await this.servidor.chamarApi('api/Empresas', this.model, true);
      if (response.Sucesso) {
        this.dialogService.confirm("Mensagem", response.Mensagem, false).subscribe(async () => {
          this.dataSource = await this.dataService.getEmpresas(2, this.session.UserRID, true);
          this.loading = false;
          this.resetItem();
        });
      } else {
        this.dialogService.confirm("Erro!", response.Mensagem);
        this.loading = false;
      }
    } else
      this.openDialig('Erro!', 'Fomulário Inválido');

    this.loading = false;
  }

  newItem(): void {
    this.formulario.reset();
    this.formulario.enable();
    this.setModel(3);
  }
  resetItem(): void {
    this.formulario.reset();
    this.formulario.disable();
    this.setModel(3);
  }

  editItem(item: Empresa): void {
    this.newItem();
    let estadoRID: string = this.getEstado(2, item.Estado);
    this.setModel(2, item);
    this.formulario.setValue({
      nomeFantasia: item.NomeFantasia,
      razaoSocial: item.RazaoSocial,
      codEmpresa: item.CodEmpresa,
      cnpj: item.Cnpj,
      rua: item.Rua,
      num: item.Num,
      complemento: item.Complemento,
      bairro: item.Bairro,
      estado: estadoRID,
      cidade: this.getCidade(2, item.Cidade),
      cep: item.Cep,
      telefone: item.Telefone,
      email: item.Email,
    });
    this.onChangeCidades(estadoRID);
  }

  async delItem() {
    if(this.formulario.valid){
      this.loading = true;
      const response: DefaultResponseModel = await this.servidor.chamarApi('api/Empresas/Delete', this.model, true);
      let title:string = response.Sucesso ? "Mensagem" : "Erro!";
      this.openDialig(title, response.Mensagem);
      this.dataSource = await this.dataService.getEmpresas(2, this.session.UserRID, true);
      this.loading = false;
    }
  }

  async buscaCep(str:string){
    this.formulario.patchValue({ cep : this.validaDocumentosService.cepFMT(str)});
    if(str.length == 9){
      let cep:number = Number(str.replace('-',''));
      const resp:CepResponse = await this.servidor.getUri("https://viacep.com.br/ws/"+cep+"/json");
      if(resp){
        this.formulario.patchValue({ rua : resp.logradouro});
        this.formulario.patchValue({ bairro : resp.bairro});
        this.formulario.patchValue({ complemento : resp.complemento});
        this.formulario.patchValue({ estado : this.getEstado(2,resp.uf.toUpperCase())});
        this.onChangeCidades(this.getEstado(2,resp.uf.toUpperCase()));
        this.formulario.patchValue({ cidade : this.getCidade(2,resp.localidade)});
      }
    }
  }
}
