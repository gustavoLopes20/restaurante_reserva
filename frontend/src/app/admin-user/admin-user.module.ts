import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { AuthGuardService } from '../auth-guard.service';

//components
import { AdminUserComponent } from './admin-user.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AuthService } from '../auth.service';

//rotas protegidas
const rotas: Routes = [
  { path: 'User', component: AdminUserComponent, canActivate: [AuthGuardService], children: [
    { path: 'Config', component: ConfiguracoesComponent, canActivateChild: [AuthGuardService] },
    { path: 'Minhas-Reservas', component: ReservasComponent, canActivateChild: [AuthGuardService] },
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(rotas),
    BrowserAnimationsModule, MatButtonModule, MatProgressSpinnerModule,
  ],
  declarations: [
    AdminUserComponent,
    ReservasComponent,
    ConfiguracoesComponent
  ],
  providers: [ApiService, AuthService, LocalizacaoService, AuthGuardService],
  bootstrap: [AdminUserComponent]
})
export class AdminUserModule { }
