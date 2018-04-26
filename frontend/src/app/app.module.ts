import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import 'hammerjs';

//services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { LocalizacaoService } from './services/localizacao.service';

//modules
import { AppRoutes } from './app.router';

//font
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//componets
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './services/dialog.service';


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
    AppRoutes,
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
