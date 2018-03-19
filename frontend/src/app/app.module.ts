import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { BuscasModule } from './buscas/buscas.module';
import { LocalizacaoService } from './localizacao.service';

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
    BuscasModule,
    BrowserAnimationsModule, MatButtonModule,
    RouterModule.forRoot(rotas)
  ],
  providers: [ApiService, AuthenticationService, LocalizacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
