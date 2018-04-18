//Models

export class AppDataObject {
    Id: number;
    RID: string;
    Registro: Date;
    DataUpdate: Date;
    Ativo: boolean;
}
export class Teste extends AppDataObject {
    Descricao: string;
}

export class Pessoa extends AppDataObject {
    Nome: string;
    TipoPessoa: number;
    Endereco: string;
    Numero: number;
    Bairro: number;
    Cidade: string;
    Uf: string;
    Cep: string;
    Telefone: string;
    Email: string;
}

export class Usuario extends Pessoa {
    Login: string;
    Senha: string;
    Email: string;
    EmailCfm: boolean;
    TokenCfmEmail: string;
    UltimoLogin: Date;
    Pessoas_Id: number;
    Pessoa: Pessoa;
}

export class InfoEmpresa extends AppDataObject{
    Title:string;
    Descricao:string;
    Empresa:Empresa;
    EmpresaId:number;
}
export class Empresa extends AppDataObject {
    NomeFantasia: string;
    RazaoSocial: string;
    CodEmpresa: string;
    Cnpj: string;
    InsEstadual: string;
    Cep: string;
    Rua: string;
    Num: number;
    Complemento: string;
    Bairro: string;
    Estado: string;
    Cidade: string;
    Telefone: string;
    Email: string;
    UsuarioId: number;
    Usuario: Usuario;
}
export class AvaliacaoEmpresa extends AppDataObject {
    Descricao: string;
    Avaliacao: number;
    Usuarios_Id: number;
    Usuario: Usuario;
    Empresas_Id: number;
    Empresa: Empresa;
}
export class Mesa extends AppDataObject {
    EmpresaId: number;
    Empresa: Empresa;
    NumeroMesa: number;
    QtdMaxPessoas: number;
    DataDisponivel: Date;
    HorarioDisponivel: Date;
    DataFMT: string;
    HorarioFMT: string;
}
export class ReservaMesa extends AppDataObject {
    QtdPessoas: number;
    Usuarios_Id: number;
    Empresas_Id: number;
    Mesas_Id: number;
    Usuario: Usuario;
    Mesa: Mesa;
    Empresa: Empresa;
}
export class Permissao extends AppDataObject {
    UsuarioId: number;
    Usuario: Usuario;
    Component: number;
    Tela: number;
    Permissao: number;
}

export class Busca {
    StrBusca:string;
    Data:string;
    Horario:string;
    QtdPessoas:number;
    LocalId:number;
    LocalName:string;
    constructor(str:string = '', data:string = '', horario:string = '', qtd:number = 1)
    {
        this.StrBusca = str;
        this.Data = data;
        this.Horario = horario;
        this.QtdPessoas = qtd;  
    }
}

//comunicationModels
export interface IResponse {
    Sucesso:boolean;
    Mensagem:string;
}
export class LoginResponseModel {
    UserName: string;
    Sucesso: boolean = false;
    Mensagem: string;
    Token: string;
}
export class SessaoResponseModel {
    Token: string;
    Mensagem: string;
    Sucesso: boolean = false;
    UserName: string;
    UserId: number;
    Permissoes: Array<Permissao>;
}
export class DefaultResponseModel {
    Sucesso: boolean = false;
    Mensagem: string;
    Retorno: Object;
}
export interface IEmpresasResquestModel {
    Cidade: string;
    UsuarioId: number;
}

export interface EstadoBr {
    Id: number;
    Sigla: string;
    Nome: string;
    RID:string;
}
export interface CidadeBr {
    Id: number;
    Nome: string;
    Estado: string;
    EstadoSigla:string;
    RID:string;
}

