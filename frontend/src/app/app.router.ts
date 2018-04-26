import { Routes,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const rotas: Routes = [
    { path: '', component: LoginComponent, pathMatch: "full" },
    { path: 'Usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule'}, // Lazy loading
    { path: 'Buscas', loadChildren: 'app/buscas/buscas.module#BuscasModule'}, // Lazy loading
    { path: 'Login', component: LoginComponent },
    { path: 'Cadastro', component: CadastroComponent },
];
  
@NgModule({
 imports: [ RouterModule.forRoot(rotas) ],
 exports: [ RouterModule ]
})

export class AppRoutes {}