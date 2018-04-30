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

  public model:Empresa;
  public displayedColumns = ['Descricao', 'Cnpj', 'Cidade', 'Estado'];
  public dataSource: Array<Empresa> = [];

  public lstEstados: Array<EstadoBr> = [];
  public lstCidades: Array<CidadeBr> = [];
  private _lstCidades: Array<CidadeBr> = [];

  public loading: boolean = false;
  public edit: boolean = false;
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
      NomeFantasia: [{ value: null, disabled: true }, [Validators.minLength(3)]],
      RazaoSocial: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]],
      Cnpj: [{ value: null, disabled: true }, Validators.required],
      CodEmpresa: [{ value: null, disabled: true }],
      Cep: [{ value: null, disabled: true }, Validators.required],
      Rua: [{ value: null, disabled: true }, Validators.required],
      Num: [{ value: null, disabled: true }, Validators.required],
      Complemento: [{ value: null, disabled: true }],
      Bairro: [{ value: null, disabled: true }, Validators.required],
      Estado: [{ value: null, disabled: true }, Validators.required],
      Cidade: [{ value: null, disabled: true }, Validators.required],
      Email: [{ value: null, disabled: true }],
      Telefone: [{ value: null, disabled: true }, Validators.required],
    });

    this.formulario.valueChanges.subscribe(resp=>{
      if(
        (resp.NomeFantasia != null && resp.NomeFantasia.length) ||
        (resp.RazaoSocial != null && resp.RazaoSocial.length) ||
        (resp.Cnpj != null && resp.Cnpj.length) ||
        (resp.CodEmpresa != null && resp.CodEmpresa.length) ||
        (resp.Cep != null && resp.Cep.length) ||
        (resp.Rua != null && resp.Rua.length) ||
        (resp.Num != null) ||
        (resp.Complemento != null && resp.Complemento.length) ||
        (resp.Bairro != null && resp.Bairro.length) ||
        (resp.Cidade != null && resp.Cidade.length) ||
        (resp.Estado != null && resp.Estado.length) ||
        (resp.Email != null && resp.Email.length) ||
        (resp.Telefone != null && resp.Telefone.length)
      )
        this.btClearFormActive = true;
      else
        this.btClearFormActive = false;
    });

    this.lstEstados = await  this.dataService.getEstadosBr();
    this._lstCidades = await this.dataService.getCidadesBr();
    this.dataSource = await this.dataService.getEmpresas(2);
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

  openDialig(title:string, mensagem:string) : void {
    this.dialogService.confirm(title, mensagem, false);
  }

  async saveItem() : Promise<void> {
    this.loading = true;
    if (this.formulario.valid && this.edit) {
      
      let session:SessaoUsuario = await this.authService.authenticate();
      if(session.Sucesso){

        this.model = this.formulario.value;
        this.model.UsuarioId = session.UserId;
        this.model.Cidade = this.dataService.getCidade(1, this.formulario.get('Cidade').value);
        this.model.Estado = this.dataService.getEstado(1, this.formulario.get('Estado').value);

        const response: DefaultResponseModel = await this.servidor.chamarApi('api/Empresas', this.model);

        if (response.Sucesso) {
          this.dialogService.confirm("Mensagem", response.Mensagem, false).subscribe(async () => {
            //this.dataSource = await this.dataService.getEmpresas(2, this.session.UserRID, true);
            this.loading = false;
            this.resetItem();
          });
        } else {
          this.dialogService.confirm("Erro!", response.Mensagem);
          this.loading = false;
        }
      }

    } else
      this.openDialig('Erro!', 'Fomulário inválido ou não pode cadastrar mais.');

    this.loading = false;
  }

  newItem(): void {
    this.formulario.reset();
    this.formulario.enable();
    this.model = new Empresa();
    this.edit = false;
  }
  resetItem(): void {
    this.formulario.reset();
    this.formulario.disable();
    this.edit = false;
  }

  async editItem(item: Empresa) : Promise<void> {
    this.newItem();
    let estadoRID: string = this.dataService.getEstado(2, item.Estado);
    this.edit = true;
    this.formulario.setValue({
      NomeFantasia: item.NomeFantasia,
      RazaoSocial: item.RazaoSocial,
      CodEmpresa: item.CodEmpresa,
      Cnpj: item.Cnpj,
      Rua: item.Rua,
      Num: item.Num,
      Complemento: item.Complemento,
      Bairro: item.Bairro,
      Estado: estadoRID,
      Cidade: this.dataService.getCidade(2, item.Cidade),
      Cep: item.Cep,
      Telefone: item.Telefone,
      Email: item.Email,
    });
    this.onChangeCidades(estadoRID);   
  }

  async delItem() {
    if(this.formulario.valid){
      this.loading = true;
      const response: DefaultResponseModel = await this.servidor.chamarApi('api/Empresas/Delete', this.model);
      let title:string = response.Sucesso ? "Mensagem" : "Erro!";
      this.openDialig(title, response.Mensagem);
      //this.dataSource = await this.dataService.getEmpresas(2, this.session.UserRID, true);
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
        this.formulario.patchValue({ estado : this.dataService.getEstado(2,resp.uf.toUpperCase())});
        this.onChangeCidades(this.dataService.getEstado(2,resp.uf.toUpperCase()));
        this.formulario.patchValue({ cidade : this.dataService.getCidade(2,resp.localidade)});
      }
    }
  }
}
