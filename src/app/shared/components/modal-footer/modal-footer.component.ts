import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent implements OnInit {

  @Input() textButton: string = "";
  @Input() disabled: boolean;
  @Output() executarAcao = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public execute(): void {
    this.executarAcao.emit();
  }

}
