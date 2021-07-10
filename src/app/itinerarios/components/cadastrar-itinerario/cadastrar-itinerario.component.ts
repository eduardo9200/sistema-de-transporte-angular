import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Linha } from 'src/app/linhas/models/linhas.model';
import { Sentido } from 'src/app/pesquisa/models/pesquisa.model';
import { Itinerario } from '../../models/itinerario.model';
import { ItinerarioService } from '../../services/itinerario.service';

@Component({
  selector: 'app-cadastrar-itinerario',
  templateUrl: './cadastrar-itinerario.component.html',
  styleUrls: ['./cadastrar-itinerario.component.scss'],
})
export class CadastrarItinerarioComponent implements OnInit {

  @Input() itinerarioCadastrado: Itinerario;
  @Input() linhas: Linha[] = [];
  @Input() disabled: boolean = false;

  formCadastro: FormGroup;

  sentido = Sentido;
  isChecked: boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private itinerarioService: ItinerarioService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.linhas = [];
    this.linhas.push({id: 2, numero: 456, nome: 'Planalto Ayrton Senna/Expedicionários/Centro', ativa: true});
    this.linhas.push({id: 1, numero: 123, nome: 'Teste 2', ativa: true});

    this.criarFormulario();
    this.setValoresFormulario();
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
    this.linhaSelecionada.setValue(this.itinerarioCadastrado.linha);
    this.itinerario.setValue(this.itinerarioCadastrado.descricao);
    this.resumo.setValue(this.itinerarioCadastrado.resumo);
    this.sentidoSelecionado.setValue(this.itinerarioCadastrado.sentido);
    this.pontoInicial.setValue(this.itinerarioCadastrado.pontoInicial);
    this.pontoFinal.setValue(this.itinerarioCadastrado.pontoFinal);
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

  public selecionouLinha(event: CustomEvent) {
    console.log(event.detail.value);
  }

  public selecionouSentido(event) {
    console.log(event.detail.value);
  }

  public changeCheckbox() {
    this.isChecked = !this.isChecked;

    if(this.isChecked) {
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

    const itinerarioObject: Itinerario = {
      linha: this.linhaSelecionada.value,
      descricao: this.itinerario.value,
      resumo: this.resumo.value,
      sentido: this.sentidoSelecionado.value,
      pontoFinal: this.pontoFinal.value,
      pontoInicial: this.pontoInicial.value
    }
    
    console.log(itinerarioObject);
    
    this.itinerarioService.salvaItinerario(itinerarioObject)
    .subscribe(() => {
      loading.dismiss();
      this.overlayService.toast({ message: 'Itinerário salvo com sucesso!' });
    }, error => {
      loading.dismiss();
      this.overlayService.toast({ message: 'Ops! Falha no salvamento do itinerário.' });
    });
  }

  public validaFormulario(): boolean {
    return this.formCadastro.valid;
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
