import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DadosBuscaLinha, SearchItemLinha, TipoItemBuscaLinha } from '../../models/pesquisa.model';
import { PesquisaBuilder } from '../../services/pesquisa.builder';

@Component({
  selector: 'app-pesquisa-horarios',
  templateUrl: './pesquisa-horarios.component.html',
  styleUrls: ['./pesquisa-horarios.component.scss'],
})
export class PesquisaHorariosComponent implements OnInit {

  @Output() dadosBusca = new EventEmitter<DadosBuscaLinha>();

  constructor(
    private pesquisaBuilder: PesquisaBuilder,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchItemList = this.pesquisaBuilder.getSearchOptionsLinha();
    this.criaFormulario();
  }

  searchItemList: SearchItemLinha[] = [];
  valorPesquisa: string = '';
  inputType: string = "text";

  formPesquisa: FormGroup;
  
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
    
    if(idItemSelecionado === TipoItemBuscaLinha.NUMERO) {
      this.inputType = "number";
    } else {
      this.inputType = "text";
    }

    if(idItemSelecionado === TipoItemBuscaLinha.TODAS) {
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
