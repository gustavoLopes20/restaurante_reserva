import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

//angularMaterial
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import 'hammerjs';

//services
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ValidaDocumentosService } from '../services/valida-documentos.service';
import { DataService } from '../services/data.service';

import { UsuariosRoutes } from './usuarios.router';

//components
import { UsuariosComponent } from './usuarios.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UserComponent } from './user/user.component';
import { EmpresaComponent } from './administrador/empresa/empresa.component';
import { MesasComponent } from './administrador/mesas/mesas.component';
import { ReservasComponent } from './administrador/reservas/reservas.component';
import { PerfilComponent } from './administrador/perfil/perfil.component';
import { PerfilUserComponent } from './user/perfil-user/perfil-user.component';
import { ReservasUserComponent } from './user/reservas-user/reservas-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    UsuariosRoutes,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    UsuariosComponent,
    AdministradorComponent,
    UserComponent,
    EmpresaComponent,
    MesasComponent,
    ReservasComponent,
    PerfilComponent,
    PerfilUserComponent,
    ReservasUserComponent,
  ],
  providers: [
    ApiService,
    AuthService,
    DataService,
    ValidaDocumentosService
  ],
  bootstrap: [UsuariosComponent]
})
export class UsuariosModule { }
