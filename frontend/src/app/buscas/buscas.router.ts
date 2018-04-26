import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import { BuscasComponent } from './buscas.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { ReservaComponent } from './reserva/reserva.component';

const rotas: Routes = [
  {
    path: '', component: BuscasComponent, children: [
      { path: 'Home', component: HomeComponent },
      { path: 'Restaurantes', component: RestaurantesComponent },
      { path: 'Reserva/:RID', component: ReservaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class BuscasRoutes { }