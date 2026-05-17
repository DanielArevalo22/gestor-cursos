import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import Course from '../../models/Course';

@Component({
  selector: 'app-card-subject',
  imports: [NgIf],
  standalone: true,
  templateUrl: './card-subject.html',
  styleUrl: './card-subject.css',
})
export class CardSubject {
  @Input({ required: true }) course!: Course;
  @Output() editClick = new EventEmitter<Course>();
  @Output() deleteClick = new EventEmitter<Course>();

  emitEdit(): void {
    this.editClick.emit(this.course);
  }

  emitDelete(): void {
    this.deleteClick.emit(this.course);
  }
}
