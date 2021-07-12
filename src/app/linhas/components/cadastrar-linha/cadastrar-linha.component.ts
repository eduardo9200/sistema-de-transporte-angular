import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Linha, TipoLinha } from '../../models/linhas.model';
import { LinhaService } from '../../services/linha.service';

@Component({
  selector: 'app-cadastrar-linha',
  templateUrl: './cadastrar-linha.component.html',
  styleUrls: ['./cadastrar-linha.component.scss'],
})
export class CadastrarLinhaComponent implements OnInit {

  @Input() linhaCadastrada: Linha;
  @Input() linhas: Linha[] = [];
  @Input() openedFromTabela: boolean = false;

  tipos: TipoLinha[] = [];

  formCadastro: FormGroup;

  disabled: boolean = false;
  showSecondButton: boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private linhaService: LinhaService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.tipos = Object.values(TipoLinha); //Enum values to array.
    this.criarFormulario();

    if(this.linhaCadastrada) {
      this.setValoresFormulario();
    }

    if(this.openedFromTabela) {
      this.disabled = true;
      this.showSecondButton = true;
      this.tipo.disable();
      this.ativa.disable();
    }
  }

  private criarFormulario() {
    this.formCadastro = this.formBuilder.group({
      numero: [null, Validators.required],
      nome: [null, Validators.required],
      tipo: [null, Validators.required],
      ativa: [false]
    });
  }

  private setValoresFormulario() {
    this.numero.setValue(this.linhaCadastrada?.numero);
    this.nome.setValue(this.linhaCadastrada?.nome);
    this.tipo.setValue(this.linhaCadastrada?.tipo);
    this.ativa.setValue(this.linhaCadastrada?.ativa);

    this.numero.updateValueAndValidity();
    this.nome.updateValueAndValidity();
    this.tipo.updateValueAndValidity();
    this.ativa.updateValueAndValidity();
  }

  get numero(): FormControl {
    return this.formCadastro.get('numero') as FormControl;
  }

  get nome(): FormControl {
    return this.formCadastro.get('nome') as FormControl;
  }

  get tipo(): FormControl {
    return this.formCadastro.get('tipo') as FormControl;
  }

  get ativa(): FormControl {
    return this.formCadastro.get('ativa') as FormControl;
  }

  public async salvarLinha() {
    const loading = await this.overlayService.loading();

    const linhaObject: Linha = {
      id: this.linhaCadastrada ? this.linhaCadastrada.id : null,
      numero: this.numero.value,
      nome: this.nome.value,
      tipo: this.tipo.value,
      ativa: this.ativa.value
    }

    this.linhaService.salvaLinha(linhaObject)
    .subscribe(() => {
      loading.dismiss();
      this.dismiss();
      this.overlayService.toast({ message: 'Linha salva com sucesso!' });
    }, error => {
      loading.dismiss();
      this.overlayService.toast({ message: 'Ops! Falha no salvamento da linha.' });
    });
  }

  public async editarLinha() {
    this.disabled = false;
    this.tipo.enable();
    this.ativa.enable();
  }

  public validaFormulario(): boolean {
    return this.formCadastro.valid;
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
