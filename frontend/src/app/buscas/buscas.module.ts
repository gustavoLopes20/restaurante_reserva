import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import 'hammerjs';

import { BuscasComponent } from './buscas.component';
import { AuthenticationService } from '../authentication.service';
import { ApiService } from '../api.service';
import { SearchService } from '../search.service';

import { CidadesComponent } from './cidades/cidades.component';
import { LocalizacaoService } from '../localizacao.service';
import { ReservaComponent } from './reserva/reserva.component';

const rotas: Routes = [
  { path: 'Buscas', component: BuscasComponent, children: [
     { path: 'Cidade/:RID', component: CidadesComponent },
     { path: 'Reserva/:RID', component: ReservaComponent },
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
    BuscasComponent,
    CidadesComponent,
    ReservaComponent
  ],
  providers: [SearchService,ApiService, AuthenticationService, LocalizacaoService],
  bootstrap: [BuscasComponent]
})
export class BuscasModule { }
