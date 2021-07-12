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
  itemSelecionado: SearchItemLinha;
  valorPesquisa: string = '';
  inputType: string = "text";

  formPesquisa: FormGroup;
  
  private criaFormulario() {
    this.formPesquisa = this.formBuilder.group({
      textoPesquisa: [null]
    });
  }

  get textoPesquisa(): FormControl {
    return this.formPesquisa.get('textoPesquisa') as FormControl;
  }

  public selecionouPesquisa(event) {
    this.itemSelecionado = event.detail.value;
    
    if(this.itemSelecionado.id === TipoItemBuscaLinha.NUMERO) {
      this.inputType = "number";
    } else {
      this.inputType = "text";
    }
  }

  public pesquisar() {
    this.dadosBusca.emit({
      itemSelecionado: this.itemSelecionado,
      textoBusca: this.textoPesquisa.value
    });
  }

}
