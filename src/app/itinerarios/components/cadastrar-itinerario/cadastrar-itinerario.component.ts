import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Linha } from 'src/app/linhas/models/linhas.model';
import { LinhaService } from 'src/app/linhas/services/linha.service';
import { Itinerario, Sentido } from '../../models/itinerario.model';
import { ItinerarioService } from '../../services/itinerario.service';

@Component({
  selector: 'app-cadastrar-itinerario',
  templateUrl: './cadastrar-itinerario.component.html',
  styleUrls: ['./cadastrar-itinerario.component.scss'],
})
export class CadastrarItinerarioComponent implements OnInit {

  @Input() itinerarioCadastrado: Itinerario;
  @Input() linhas: Linha[] = [];
  @Input() openedFromTabela: boolean = false;

  formCadastro: FormGroup;

  sentido = Sentido;

  disabled: boolean = false;
  showSecondButton: boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private itinerarioService: ItinerarioService,
    private linhaService: LinhaService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.buscaTodasAsLinhas();
    this.criarFormulario();

    if(this.openedFromTabela) {
      this.disabled = true;
      this.showSecondButton = true;
      this.linhaSelecionada.disable();
    }
  }

  private buscaTodasAsLinhas() {
    this.linhaService.buscaTodasLinhas()
    .subscribe(linhas => {
      this.linhas = linhas
      if(this.itinerarioCadastrado) {
        this.setValoresFormulario();
      }
    });
  }

  private criarFormulario() {
    this.formCadastro = this.formBuilder.group({
      linhaSelecionada: [null, Validators.required],
      itinerario: [null, Validators.required],
      resumo: [null, Validators.required],
      sentidoSelecionado: [null, Validators.required],
      pontoInicial: [null, Validators.required],
      pontoFinal: [null, Validators.required]
    });
  }

  private setValoresFormulario() {
    this.linhaSelecionada.setValue(this.itinerarioCadastrado?.linha.id);
    this.itinerario.setValue(this.itinerarioCadastrado?.descricao);
    this.resumo.setValue(this.itinerarioCadastrado?.resumo);
    this.sentidoSelecionado.setValue(this.itinerarioCadastrado?.sentido);
    this.pontoInicial.setValue(this.itinerarioCadastrado?.pontoInicial);
    this.pontoFinal.setValue(this.itinerarioCadastrado?.pontoFinal);

    this.linhaSelecionada.updateValueAndValidity();
    this.itinerario.updateValueAndValidity();
    this.resumo.updateValueAndValidity();
    this.sentidoSelecionado.updateValueAndValidity();
    this.pontoInicial.updateValueAndValidity();
    this.pontoFinal.updateValueAndValidity();
  }

  get linhaSelecionada(): FormControl {
    return this.formCadastro.get('linhaSelecionada') as FormControl;
  }

  get itinerario(): FormControl {
    return this.formCadastro.get('itinerario') as FormControl;
  }

  get resumo(): FormControl {
    return this.formCadastro.get('resumo') as FormControl;
  }

  get sentidoSelecionado(): FormControl {
    return this.formCadastro.get('sentidoSelecionado') as FormControl;
  }

  get pontoInicial(): FormControl {
    return this.formCadastro.get('pontoInicial') as FormControl;
  }

  get pontoFinal(): FormControl {
    return this.formCadastro.get('pontoFinal') as FormControl;
  }

  public changeCheckbox(event) {
    if(event.detail.checked) {
      this.ordenarLinhaPorNumero();
    } else {
      this.ordenarLinhaPorNome();
    }
  }

  private ordenarLinhaPorNumero(): void {
    this.linhas = this.linhas.sort((a, b) => a.numero > b.numero ? 1 : (b.numero > a.numero ? -1 : 0));
  }

  private ordenarLinhaPorNome(): void {
    this.linhas = this.linhas.sort((a, b) => a.nome > b.nome ? 1 : (b.nome > a.nome ? -1 : 0));
  }

  public async salvarItinerario() {
    const loading = await this.overlayService.loading();

    const linhaSelecionadaObject: Linha = this.linhas.find(linha => linha.id === this.linhaSelecionada.value);

    const itinerarioObject: Itinerario = {
      id: this.itinerarioCadastrado ? this.itinerarioCadastrado.id : null,
      linha: linhaSelecionadaObject,
      descricao: this.itinerario.value,
      resumo: this.resumo.value,
      sentido: this.sentidoSelecionado.value,
      pontoFinal: this.pontoFinal.value,
      pontoInicial: this.pontoInicial.value
    }
    
    this.itinerarioService.salvaItinerario(itinerarioObject)
    .subscribe(() => {
      loading.dismiss();
      this.dismiss();
      this.overlayService.toast({ message: 'Itinerário salvo com sucesso!' });
    }, error => {
      loading.dismiss();
      this.overlayService.toast({ message: 'Ops! Falha no salvamento do itinerário.' });
    });
  }

  public async editarItinerario() {
    this.disabled = false;
    this.linhaSelecionada.enable();
  }

  public validaFormulario(): boolean {
    return this.formCadastro.valid;
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
