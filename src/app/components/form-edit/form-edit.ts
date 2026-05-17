import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Course from '../../models/Course';
import { Courses } from '../../services/courses';

@Component({
  selector: 'app-form-edit',
  imports: [FormsModule, NgIf],
  standalone: true,
  templateUrl: './form-edit.html',
  styleUrl: './form-edit.css',
})
export class FormEdit implements OnChanges {
  @Input({ required: true }) course!: Course;
  @Output() closeModal = new EventEmitter<void>();
  @Output() courseSaved = new EventEmitter<void>();

  loadError = '';
  name = '';
  teachName = '';
  slots = 0;

  constructor(private coursesService: Courses) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      this.name = this.course.name;
      this.teachName = this.course.teachName;
      this.slots = this.course.slots;
      this.loadError = '';
    }
  }

  saveCourse(): void {
    if (!this.name.trim() || !this.teachName.trim() || this.slots < 1) {
      this.loadError = 'Completa todos los campos.';
      return;
    }

    this.coursesService
      .updateCourse(this.course.idCo, {
        idCo: this.course.idCo,
        name: this.name.trim(),
        teachName: this.teachName.trim(),
        slots: this.slots,
        takenSlots: this.course.takenSlots,
        available: this.course.available,
      })
      .subscribe({
        next: () => {
          alert('Curso editado correctamente.');
          this.courseSaved.emit();
        },
        error: () => {
          this.loadError = 'Error al actualizar el curso.';
        },
      });
  }

  sendCloseModal(): void {
    this.closeModal.emit();
  }
}
