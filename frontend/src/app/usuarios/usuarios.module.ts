import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutes } from './usuarios.router';
import { UsuariosComponent } from './usuarios.component';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutes,
  ],
  declarations: [
    UsuariosComponent,
  ],
  providers: [DataService, AuthService],
  bootstrap: [UsuariosComponent]
})
export class UsuariosModule { }
