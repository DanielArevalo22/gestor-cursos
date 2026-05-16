import { Component, EventEmitter, Input, Output } from '@angular/core';
import Course from '../../models/Course';

@Component({
  selector: 'app-card-subject',
  imports: [],
  standalone: true,
  templateUrl: './card-subject.html',
  styleUrl: './card-subject.css',
})
export class CardSubject {
  @Input({ required: true }) course!: Course;
  @Output() editClick = new EventEmitter<void>();

  emitEdit(): void {
    this.editClick.emit();
  }
}
