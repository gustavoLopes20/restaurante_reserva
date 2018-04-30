import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import { AdministradorComponent } from './administrador.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { MesasComponent } from './mesas/mesas.component';
import { ReservasComponent } from './reservas/reservas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuardAdminService } from '../../services/auth-guard-admin.service';

const rotas: Routes = [
    {
        path: '', component: AdministradorComponent, canActivateChild: [AuthGuardAdminService], children: [
            { path: 'Empresa', component: EmpresaComponent },
            { path: 'Mesas', component: MesasComponent },
            { path: 'Reservas', component: ReservasComponent },
            { path: 'Perfil', component: PerfilComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    providers: [AuthGuardAdminService],
    exports: [RouterModule]
})

export class AdministradorRoutes { }