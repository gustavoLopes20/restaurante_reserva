import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import 'hammerjs';

//services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


//font
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//componets
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './services/dialog.service';

const rotas: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
  { path: 'Usuarios', canActivate:[AuthGuardService], loadChildren: 'app/usuarios/usuarios.module#UsuariosModule'}, // Lazy loading -- verificando se o acesso é um usuario
  { path: 'Buscas', loadChildren: 'app/buscas/buscas.module#BuscasModule'}, // Lazy loading
  { path: 'Login', component: LoginComponent },
  { path: 'Cadastro', component: CadastroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule.forRoot(rotas),
    AngularFontAwesomeModule,    
  ],
  exports: [
    DialogComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [
    ApiService,
    AuthService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
