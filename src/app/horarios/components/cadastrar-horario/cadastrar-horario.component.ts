import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Linha } from 'src/app/linhas/models/linhas.model';
import { LinhaService } from 'src/app/linhas/services/linha.service';
import { Horario } from '../../models/horarios.model';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-cadastrar-horario',
  templateUrl: './cadastrar-horario.component.html',
  styleUrls: ['./cadastrar-horario.component.scss'],
})
export class CadastrarHorarioComponent implements OnInit {
  
  @Input() horarioCadastrado: Horario;
  @Input() linhas: Linha[] = [];
  @Input() openedFromTabela: boolean = false;

  formCadastro: FormGroup;

  disabled: boolean = false;
  showSecondButton: boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private horarioService: HorarioService,
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
      this.setValoresFormulario();
    }
  }

  private buscaTodasAsLinhas() {
    this.linhaService.buscaTodasLinhas()
    .subscribe(linhas => {
      this.linhas = linhas
      if(this.horarioCadastrado) {
        this.setValoresFormulario();
      }
    });
  }

  private criarFormulario() {
    this.formCadastro = this.formBuilder.group({
      linhaSelecionada: [null, Validators.required],
      uteisInicio: [null],
      uteisFim: [null],
      uteisIntervalo: [null],
      sabadosInicio: [null],
      sabadosFim: [null],
      sabadosIntervalo: [null],
      domingosInicio: [null],
      domingosFim: [null],
      domingosIntervalo: [null]
    });
  }

  private setValoresFormulario() {
    this.linhaSelecionada.setValue(this.horarioCadastrado?.linha.id);
    this.uteisInicio.setValue(this.horarioCadastrado?.inicioDiaUtil);
    this.uteisFim.setValue(this.horarioCadastrado?.fimDiaUtil);
    this.uteisIntervalo.setValue(this.horarioCadastrado?.intervaloDiaUtil);
    this.sabadosInicio.setValue(this.horarioCadastrado?.inicioSabado);
    this.sabadosFim.setValue(this.horarioCadastrado?.fimSabado);
    this.sabadosIntervalo.setValue(this.horarioCadastrado?.intervaloSabado);
    this.domingosInicio.setValue(this.horarioCadastrado?.inicioDomingoEFeriado);
    this.domingosFim.setValue(this.horarioCadastrado?.fimDomingoEFeriado);
    this.domingosIntervalo.setValue(this.horarioCadastrado?.intervaloDomingoEFeriado);

    this.linhaSelecionada.updateValueAndValidity();
    this.uteisInicio.updateValueAndValidity();
    this.uteisFim.updateValueAndValidity();
    this.uteisIntervalo.updateValueAndValidity();
    this.sabadosInicio.updateValueAndValidity();
    this.sabadosFim.updateValueAndValidity();
    this.sabadosIntervalo.updateValueAndValidity();
    this.domingosInicio.updateValueAndValidity();
    this.domingosFim.updateValueAndValidity();
    this.domingosIntervalo.updateValueAndValidity();
  }

  get linhaSelecionada(): FormControl {
    return this.formCadastro.get('linhaSelecionada') as FormControl;
  }

  get uteisInicio(): FormControl {
    return this.formCadastro.get('uteisInicio') as FormControl;
  }

  get uteisFim(): FormControl {
    return this.formCadastro.get('uteisFim') as FormControl;
  }

  get uteisIntervalo(): FormControl {
    return this.formCadastro.get('uteisIntervalo') as FormControl;
  }

  get sabadosInicio(): FormControl {
    return this.formCadastro.get('sabadosInicio') as FormControl;
  }

  get sabadosFim(): FormControl {
    return this.formCadastro.get('sabadosFim') as FormControl;
  }

  get sabadosIntervalo(): FormControl {
    return this.formCadastro.get('sabadosIntervalo') as FormControl;
  }

  get domingosInicio(): FormControl {
    return this.formCadastro.get('domingosInicio') as FormControl;
  }

  get domingosFim(): FormControl {
    return this.formCadastro.get('domingosFim') as FormControl;
  }

  get domingosIntervalo(): FormControl {
    return this.formCadastro.get('domingosIntervalo') as FormControl;
  }

  public changeCheckbox(event) {
    if(event.detail.checked) {
      this.ordenarHorarioPorNumero();
    } else {
      this.ordenarHorarioPorNome();
    }
  }

  private ordenarHorarioPorNumero(): void {
    this.linhas = this.linhas.sort((a, b) => a.numero > b.numero ? 1 : (b.numero > a.numero ? -1 : 0));
  }

  private ordenarHorarioPorNome(): void {
    this.linhas = this.linhas.sort((a, b) => a.nome > b.nome ? 1 : (b.nome > a.nome ? -1 : 0));
  }

  public async salvarHorario() {
    const loading = await this.overlayService.loading();

    const linhaSelecionadaObject: Linha = this.linhas.find(linha => linha.id === this.linhaSelecionada.value);

    const horarioObject: Horario = {
      id: this.horarioCadastrado ? this.horarioCadastrado.id : null,
      linha: linhaSelecionadaObject,
      inicioDiaUtil: this.uteisInicio.value,
      inicioSabado: this.sabadosInicio.value,
      inicioDomingoEFeriado: this.domingosInicio.value,
      fimDiaUtil: this.uteisFim.value,
      fimSabado: this.sabadosFim.value,
      fimDomingoEFeriado: this.domingosFim.value,
      intervaloDiaUtil: this.uteisIntervalo.value,
      intervaloSabado: this.sabadosIntervalo.value,
      intervaloDomingoEFeriado: this.domingosIntervalo.value
    }
    
    this.horarioService.salvaHorario(horarioObject)
    .subscribe(() => {
      loading.dismiss();
      this.dismiss();
      this.overlayService.toast({ message: 'Hor??rio salvo com sucesso!' });
    }, error => {
      loading.dismiss();
      this.overlayService.toast({ message: 'Ops! Falha no salvamento do hor??rio.' });
    });
  }

  public async editarHorario() {
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
