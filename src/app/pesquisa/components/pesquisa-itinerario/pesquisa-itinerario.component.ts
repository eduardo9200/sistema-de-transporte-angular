import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DadosBusca, SearchItem } from '../../models/pesquisa.model';
import { PesquisaBuilder } from '../../services/pesquisa.builder';

@Component({
  selector: 'app-pesquisa-itinerario',
  templateUrl: './pesquisa-itinerario.component.html',
  styleUrls: ['./pesquisa-itinerario.component.scss'],
})
export class PesquisaItinerarioComponent implements OnInit {

  @Output() dadosBusca = new EventEmitter<DadosBusca>();

  searchItemList: SearchItem[] = [];
  itemSelecionado: SearchItem;
  valorPesquisa: string = '';

  formPesquisa: FormGroup;

  constructor(
    private pesquisaBuilder: PesquisaBuilder,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchItemList = this.pesquisaBuilder.getSearchOptions();
    this.criaFormulario();
  }

  private criaFormulario() {
    this.formPesquisa = this.formBuilder.group({
      textoPesquisa: [null]
    });
  }

  get textoPesquisa(): FormControl {
    return this.formPesquisa.get('textoPesquisa') as FormControl;
  }

  public selecionouPesquisa(event: CustomEvent) {
    this.itemSelecionado = event.detail.value;
  }

  public pesquisar() {
    this.dadosBusca.emit({
      itemSelecionado: this.itemSelecionado,
      textoBusca: this.textoPesquisa.value
    });
  }

}
