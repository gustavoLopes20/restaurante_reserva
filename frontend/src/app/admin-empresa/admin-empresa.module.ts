import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

//angularMaterial
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import 'hammerjs';

//services
import { ApiService } from '../api.service';
import { LocalizacaoService } from '../localizacao.service';
import { AuthService } from '../auth.service';
import { AuthGuardService } from '../auth-guard.service';
import { DataService } from '../Data/data.service';
import { ValidaDocumentosService } from '../valida-documentos.service';

//componets
import { AdminEmpresaComponent } from './admin-empresa.component';
import { MesasComponent } from './mesas/mesas.component';
import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';



//rotas protegidas
const rotas: Routes = [
  { path: 'Admin', component: AdminEmpresaComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], children: [
    // { path: '', component: EstabelecimentosComponent, pathMatch: "full" },
    { path: 'Mesas', component: MesasComponent },
    { path: 'Estabelecimentos', component: EstabelecimentosComponent  },
    { path: 'Config', component: ConfiguracoesComponent },
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(rotas),
    ReactiveFormsModule,
    BrowserAnimationsModule, MatButtonModule, MatProgressSpinnerModule,
  ],
  declarations: [
    AdminEmpresaComponent,
    MesasComponent,
    EstabelecimentosComponent,
    ConfiguracoesComponent
  ],
  providers: [
    ApiService,
    AuthService,
    LocalizacaoService,
    DataService,
    AuthGuardService,
    ValidaDocumentosService
  ],
  bootstrap: [AdminEmpresaComponent]
})
export class AdminEmpresaModule { }