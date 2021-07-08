import { Component, OnInit } from '@angular/core';
import { DadosBusca, ResultadoItinerario } from '../pesquisa/models/pesquisa.model';
import { PesquisaItinerarioService } from '../pesquisa/services/pesquisa-itinerario.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.page.html',
  styleUrls: ['./itinerarios.page.scss'],
})
export class ItinerariosPage implements OnInit {

  resultadoBusca: ResultadoItinerario[];

  constructor(
    private pesquisaItinerarioService: PesquisaItinerarioService
  ) { }

  ngOnInit() {
  }

  public buscar(event: DadosBusca) {
    this.pesquisaItinerarioService
    .buscaItinerario(event)
    .subscribe(value => {
      console.log('teste');
    });
    console.log(event);
  }
}
