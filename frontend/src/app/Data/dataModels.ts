//Models

export class AppDataObject {
    Id: number;
    RID: string;
    Registro: Date;
    DataUpdate: Date;
    Ativo: boolean;
}

export class CadastroUsuario {
    NomeUsuario:string;
    Email: string;
    Senha: string;
    Csenha: string;
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
    Usuario: Object;
}
export class AvaliacaoEmpresa extends AppDataObject {
    Descricao: string;
    Avaliacao: number;
    Usuarios_Id: number;
    Usuario: Object;
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
    Usuario: Object;
    Mesa: Mesa;
    Empresa: Empresa;
}
export class PermissaoUsuario extends AppDataObject {
    UsuarioId: number;
    Usuario: Object;
    Component: number;
    Consultar: boolean;
    Incluir: boolean;
    Editar: boolean;
    Excluir: boolean;
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
    UserNivel:number;
    Sucesso: boolean = false;
    Mensagem: string;
    Token: string;
}
export class SessaoUsuario {
    Token: string = '';
    Mensagem: string;
    Sucesso: boolean = false;
    UserName: string;
    UserId: number;
    UserRID:string;
    UserNivel:number;
    PermissoesUser: Array<PermissaoUsuario>;
}
export class DefaultResponseModel {
    Sucesso: boolean = false;
    Mensagem: string;
    Retorno: Object;
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

export interface IComponent{
    Id:number;
    Descricao:string;
    ComponentPai:number;
}
export interface CepResponse{
    cep:string;
    logradouro:string;
    complemento:string;
    bairro:string;
    localidade:string;
    uf:string;
    unidade:string;
    ibge:string;
    gia:string;
}
export interface DataRoute{
    Descricao:string;
    Link:string;
    Iclass:string;
    Ativo:Boolean;
}