import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import 'hammerjs';

//services
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { LocalizacaoService } from './localizacao.service';

//modules
import { BuscasModule } from './buscas/buscas.module';
import { AdminEmpresaModule } from './admin-empresa/admin-empresa.module';
import { AdminUserModule } from './admin-user/admin-user.module';

//font
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//componets
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog.service';

const rotas: Routes = [
  //{ path: '', component: HomeComponent, pathMatch: "full" },
  { path: 'Login', component: LoginComponent },
  { path: 'Cadastro', component: CadastroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BuscasModule,
    AdminEmpresaModule,
    AdminUserModule,
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
    LocalizacaoService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
