import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DadosBusca, SearchItem, TipoItemBusca } from '../../models/pesquisa.model';
import { PesquisaBuilder } from '../../services/pesquisa.builder';

@Component({
  selector: 'app-pesquisa-itinerario',
  templateUrl: './pesquisa-itinerario.component.html',
  styleUrls: ['./pesquisa-itinerario.component.scss'],
})
export class PesquisaItinerarioComponent implements OnInit {

  @Output() dadosBusca = new EventEmitter<DadosBusca>();

  searchItemList: SearchItem[] = [];
  valorPesquisa: string = '';
  inputType: string = "text";

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
      opcaoPesquisa: [null],
      textoPesquisa: [null]
    });
  }

  get opcaoPesquisa(): FormControl {
    return this.formPesquisa.get('opcaoPesquisa') as FormControl;
  }

  get textoPesquisa(): FormControl {
    return this.formPesquisa.get('textoPesquisa') as FormControl;
  }

  public selecionouPesquisa(event) {
    const idItemSelecionado = event.detail.value.id;

    if(idItemSelecionado === TipoItemBusca.NUMERO) {
      this.inputType = "number";
    } else {
      this.inputType = "text";
    }

    if(idItemSelecionado === TipoItemBusca.TODOS) {
      this.textoPesquisa.disable();
    } else {
      this.textoPesquisa.enable();
    }
  }

  public pesquisar() {
    this.dadosBusca.emit({
      itemSelecionado: this.opcaoPesquisa.value,
      textoBusca: this.textoPesquisa.value
    });
  }

}
