import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor() { }

  ngOnInit() {
    // let permissoes:Array<Permissao> = await this.servidor.getUri("assets/Data/configPermissoes.json");
    // let components:Array<Component> = await this.servidor.getUri("assets/Data/configComponents.json");
  } 

}
