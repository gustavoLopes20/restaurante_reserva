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
import { AuthGuardService } from '../services/auth-guard.service';
import { ReservasUserComponent } from './user/reservas-user/reservas-user.component';


const rotas: Routes = [
    {
        path: '', component: UsuariosComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], children: [
            {
                path: 'Admin', component: AdministradorComponent ,children: [
                    { path: 'Empresa', component: EmpresaComponent },
                    { path: 'Mesas', component: MesasComponent },
                    { path: 'Reservas', component: ReservasComponent },
                    { path: 'Perfil', component: PerfilComponent },
                ]
            },
            {
                path: 'User', component: UserComponent, children: [
                    { path: 'Perfil', component: PerfilUserComponent },
                    { path: 'Reservas', component: ReservasUserComponent },
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})

export class UsuariosRoutes { }