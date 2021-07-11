import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent implements OnInit {

  @Input() textButton: string = "";
  @Input() disabled: boolean;
  @Input() showSecondButton: boolean = false;
  @Input() textSecondButton: string = "";

  @Output() executarAcao = new EventEmitter<void>();
  @Output() executarSegundaAcao = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public execute(): void {
    this.executarAcao.emit();
  }

  public execute2Btn(): void {
    this.executarSegundaAcao.emit();
  }
}
