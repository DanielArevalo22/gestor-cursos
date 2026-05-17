import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Courses } from '../../services/courses';

@Component({
  selector: 'app-form-create',
  imports: [FormsModule, NgIf],
  standalone: true,
  templateUrl: './form-create.html',
  styleUrl: './form-create.css',
})
export class FormCreate {
  @Output() closeModal = new EventEmitter<void>();
  @Output() courseSaved = new EventEmitter<void>();

  name = '';
  teachName = '';
  slots: number | null = null;
  saveError = '';

  constructor(private coursesService: Courses) {}

  createCourse(): void {
    this.saveError = '';

    if (!this.name.trim() || !this.teachName.trim() || !this.slots || this.slots < 1) {
      this.saveError = 'Completa todos los campos.';
      return;
    }

    this.coursesService
      .createCourse({
        name: this.name.trim(),
        teachName: this.teachName.trim(),
        slots: this.slots,
        takenSlots: 0,
        available: true,
      })
      .subscribe({
        next: () => {
          alert('Curso creado correctamente.');
          this.courseSaved.emit();
        },
        error: () => {
          this.saveError = 'No se pudo crear el curso.';
        },
      });
  }

  sendCloseModal(): void {
    this.closeModal.emit();
  }
}
