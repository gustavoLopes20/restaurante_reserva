import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import 'hammerjs';

import { BuscasComponent } from './buscas.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { BuscasService } from './buscas.service';

import { ReservaComponent } from './reserva/reserva.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DataService } from '../services/data.service';
import { BuscasRoutes } from './buscas.router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BuscasRoutes,
    ReactiveFormsModule,
    MatButtonModule, MatProgressSpinnerModule,
  ],
  declarations: [
    BuscasComponent,
    ReservaComponent,
    HomeComponent,
    RestaurantesComponent
  ],
  providers: [ApiService, AuthService, DataService, BuscasService],
  bootstrap: [BuscasComponent]
})
export class BuscasModule { }
