import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BuscasModule,
    AdminEmpresaModule,
    AdminUserModule,
    BrowserAnimationsModule, MatButtonModule,
    RouterModule.forRoot(rotas), MatProgressBarModule,
    AngularFontAwesomeModule,
  ],
  providers: [ApiService, AuthService, LocalizacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
