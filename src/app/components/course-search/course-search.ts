import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Courses } from '../../services/courses';
import Course from '../../models/Course';

@Component({
  selector: 'app-course-search',
  imports: [FormsModule, NgIf],
  templateUrl: './course-search.html',
  styleUrl: './course-search.css',
})
export class CourseSearch {

  @Output() courseFound = new EventEmitter<Course>();
  @Output() showAllCourses = new EventEmitter<void>();

  searchId: number | null = null;
  searchError = '';
  foundMessage = '';

  constructor(private coursesService: Courses) {}

  search(): void {
    this.searchError = '';
    this.foundMessage = '';

    if (this.searchId == null || this.searchId <= 0) {
      this.searchError = 'Debe ingresar un ID válido.';
      return;
    }

    this.coursesService.getCourseById(this.searchId).subscribe({
      next: (course) => {
        this.foundMessage = 'Curso encontrado: ' + course.name;
        this.courseFound.emit(course);
      },
      error: () => {
        this.searchError = 'No se encontró un curso con ese ID.';
      },
    });
  }

  viewCourses(): void {
    this.searchId = null;
    this.searchError = '';
    this.foundMessage = '';
    this.showAllCourses.emit();
  }
  
}