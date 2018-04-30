import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import { UsuariosComponent } from './usuarios.component';
import { UserComponent } from './user/user.component';
import { PerfilUserComponent } from './user/perfil-user/perfil-user.component';

import { AdministradorComponent } from './administrador/administrador.component';
import { MesasComponent } from './administrador/mesas/mesas.component';
import { EmpresaComponent } from './administrador/empresa/empresa.component';
import { PerfilComponent } from './administrador/perfil/perfil.component';
import { ReservasComponent } from './administrador/reservas/reservas.component';
import { ReservasUserComponent } from './user/reservas-user/reservas-user.component';

import { AuthGuardAdminService } from '../services/auth-guard-admin.service';
import { AuthGuardUserService } from '../services/auth-guard-user.service';

const rotas: Routes = [
    {
        path: '', component: UsuariosComponent, children: [
            { path: 'Admin', canActivate:[AuthGuardAdminService], loadChildren: 'app/usuarios/administrador/administrador.module#AdministradorModule'}, // Lazy loading
            { path: 'User', canActivate:[AuthGuardUserService], loadChildren: 'app/usuarios/user/user.module#UserModule'} // Lazy loading
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    providers: [AuthGuardAdminService, AuthGuardUserService],
    exports: [RouterModule]
})

export class UsuariosRoutes { }