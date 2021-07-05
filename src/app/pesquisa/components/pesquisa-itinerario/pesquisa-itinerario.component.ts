import { Component, OnInit } from '@angular/core';
import { SearchItem } from '../../models/pesquisa.model';
import { PesquisaBuilder } from '../../services/pesquisa.builder';

@Component({
  selector: 'app-pesquisa-itinerario',
  templateUrl: './pesquisa-itinerario.component.html',
  styleUrls: ['./pesquisa-itinerario.component.scss'],
})
export class PesquisaItinerarioComponent implements OnInit {

  searchItemList: SearchItem[] = [];
  valorPesquisa: string = '';

  constructor(
    private pesquisaBuilder: PesquisaBuilder
  ) { }

  ngOnInit() {
    this.searchItemList = this.pesquisaBuilder.getSearchOptions();
  }

  public selecionouPesquisa(event: CustomEvent) {
    console.log(event.detail.value);
  }

}
