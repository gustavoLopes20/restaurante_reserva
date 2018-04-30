import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//angularMaterial
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import 'hammerjs';

//services
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ValidaDocumentosService } from '../../services/valida-documentos.service';
import { DataService } from '../../services/data.service';
import { AdministradorRoutes } from './administrador.router';

import { AdministradorComponent } from './administrador.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { MesasComponent } from './mesas/mesas.component';
import { ReservasComponent } from './reservas/reservas.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdministradorRoutes,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    AdministradorComponent,
    EmpresaComponent,
    MesasComponent,
    ReservasComponent,
    PerfilComponent
  ],
  providers: [
    ApiService,
    AuthService,
    DataService,
    ValidaDocumentosService
  ],
  bootstrap: [AdministradorComponent]
})
export class AdministradorModule { }
