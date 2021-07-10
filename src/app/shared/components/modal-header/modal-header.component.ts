import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {

  @Input() texto: string = "";
  @Output() dismiss = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public fecharModal(): void {
    this.dismiss.emit();
  }

}
