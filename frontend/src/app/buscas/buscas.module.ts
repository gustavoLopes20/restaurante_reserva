import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import 'hammerjs';

import { BuscasComponent } from './buscas.component';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { DataService } from '../Data/data.service';
import { BuscasService } from './buscas.service';
import { LocalizacaoService } from '../localizacao.service';

import { ReservaComponent } from './reserva/reserva.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';



const rotas: Routes = [
  { path: 'Buscas', component: BuscasComponent, children: [
    { path: '', component: HomeComponent, pathMatch: "full" },
    { path: 'Home', component: HomeComponent},
    { path: 'Restaurantes', component: RestaurantesComponent},
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
    ReactiveFormsModule,
    BrowserAnimationsModule, MatButtonModule, MatProgressSpinnerModule,
  ],
  declarations: [
    BuscasComponent,
    ReservaComponent,
    HomeComponent,
    RestaurantesComponent
  ],
  providers: [ApiService, AuthService, LocalizacaoService, DataService, BuscasService],
  bootstrap: [BuscasComponent]
})
export class BuscasModule { }
