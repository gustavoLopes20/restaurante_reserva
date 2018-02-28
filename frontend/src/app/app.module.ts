import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material'; 
import { MatProgressSpinnerModule } from '@angular/material';
import { MatTooltipModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import 'hammerjs';

import { HomeComponent } from './home/home.component';
import { ReservaComponent } from './reserva/reserva.component';
import { BuscaComponent } from './busca/busca.component';
import { BuscaService } from './busca.service';

const rotas: Routes = [
    { path: '', component: HomeComponent, pathMatch: "full" },
    { path: 'Search/:str', component: BuscaComponent },
    { path: 'Reserva/:id', component: ReservaComponent },
 ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservaComponent,
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, MatInputModule, MatButtonModule, MatSelectModule,
    MatRadioModule, MatProgressBarModule, MatDialogModule, MatProgressSpinnerModule,
    MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatTabsModule,
    RouterModule.forRoot(rotas)
  ],
  providers: [BuscaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
