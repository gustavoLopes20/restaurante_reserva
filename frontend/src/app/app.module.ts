import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

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
import 'hammerjs';

import { AppComponent } from './app.component';
import { BuscaComponent } from './busca/busca.component';
import { SearchService } from './search.service';
import { ReservaComponent } from './reserva/reserva.component';

const rotas: Routes = [
  //{ path: '', component: HomeComponent, pathMatch: "full" },
  { path: 'Search/:RID', component: BuscaComponent },
  { path: 'Reserva/:RID', component: ReservaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BuscaComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, MatInputModule, MatButtonModule, MatSelectModule,
    MatRadioModule, MatProgressBarModule, MatDialogModule, MatProgressSpinnerModule,
    MatTooltipModule, MatDatepickerModule, MatNativeDateModule,
    RouterModule.forRoot(rotas)
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
