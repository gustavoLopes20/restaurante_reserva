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

import { UserRoutes } from './user.router';

import { UserComponent } from './user.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { ReservasUserComponent } from './reservas-user/reservas-user.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    UserRoutes,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    UserComponent,
    PerfilUserComponent,
    ReservasUserComponent
  ],
  providers: [
    ApiService,
    AuthService,
    DataService,
    ValidaDocumentosService
  ],
  bootstrap: [UserComponent]
})
export class UserModule { }
