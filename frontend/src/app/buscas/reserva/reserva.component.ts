import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../data/dataModels';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  public restaurante:Empresa = new Empresa();

  constructor(
    private router: ActivatedRoute,
    private dataService: DataService,
    private routerRedirect:Router
  ) { }

  ngOnInit() {
    this.router.params.subscribe(async params => {
      let rid: string = params['RID'];
      let restaurantes:Empresa[] = await this.dataService.getEmpresas(1);
      let restaurante:Empresa = restaurantes.find(a => a.RID == rid);

      if(restaurante){
        this.restaurante = restaurante;
      }else{
        this.restaurante = new Empresa();
        //this.routerRedirect.navigate(['/Buscas']);
      }

    });
  }

}
