import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-create',
  imports: [],
  standalone: true,
  templateUrl: './form-create.html',
  styleUrl: './form-create.css',
})
export class FormCreate {

  @Output() closeModal = new EventEmitter<void>();

  sendCloseModal(){
    this.closeModal.emit();
  }
}
