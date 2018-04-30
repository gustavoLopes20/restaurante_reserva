import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { AuthGuardUserService } from '../../services/auth-guard-user.service';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { ReservasUserComponent } from './reservas-user/reservas-user.component';

const rotas: Routes = [
    {
        path: '', component: UserComponent, canActivateChild: [AuthGuardUserService], children: [
            { path: 'Perfil', component: PerfilUserComponent },
            { path: 'Reservas', component: ReservasUserComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotas)],
    providers: [AuthGuardUserService],
    exports: [RouterModule]
})

export class UserRoutes { }