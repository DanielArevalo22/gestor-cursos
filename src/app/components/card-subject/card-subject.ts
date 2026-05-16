import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-subject',
  imports: [],
  standalone: true,
  templateUrl: './card-subject.html',
  styleUrl: './card-subject.css',
})
export class CardSubject {
  @Output() editClick = new EventEmitter<void>();

  emitEdit(): void {
    this.editClick.emit();
  }
}
