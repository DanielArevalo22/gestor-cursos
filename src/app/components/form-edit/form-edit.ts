import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-edit',
  imports: [],
  standalone: true,
  templateUrl: './form-edit.html',
  styleUrl: './form-edit.css',
})
export class FormEdit {

  @Output() closeModal = new EventEmitter<void>();

  sendCloseModal(){
    this.closeModal.emit();
  }
}
