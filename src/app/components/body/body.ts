import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardSubject } from '../card-subject/card-subject';
import { FormCreate } from '../form-create/form-create';
import { FormEdit } from '../form-edit/form-edit';
import { CourseSearch } from '../course-search/course-search';
import Course from '../../models/Course';
import { Courses } from '../../services/courses';

declare const bootstrap: any;

@Component({
  selector: 'app-body',
  imports: [CardSubject, FormCreate, FormEdit, CourseSearch, NgIf, NgFor],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body implements OnInit {

  modalActivo: 'c' | 'e' | null = null;
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(
    private courService: Courses,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courService.findAllCoures().subscribe({
      next: (data) => {
        this.courses = data;
        console.log(this.courses);

        // Esto obliga a Angular a refrescar la vista xq antes solo renderizaba cuando interactuaba con el input
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando cursos:', err),
    });
  }

  onCourseSaved(): void {
    this.closeModal();
    this.loadCourses();
  }

  openCreateModal(): void {
    this.selectedCourse = null;
    this.modalActivo = 'c';
    this.toggleModal(true);
  }

  openEditModal(course: Course): void {
    this.selectedCourse = course;
    this.modalActivo = 'e';
    this.toggleModal(true);
  }

  deleteCourse(course: Course): void {
    const confirmar = confirm(`¿Está seguro de eliminar el curso "${course.name}"?`);
  
    if (!confirmar) return;
  
    this.courService.deleteCourse(course.idCo).subscribe({
      next: (mensaje) => {
        alert(mensaje);
  
        this.courses = this.courses.filter(c => c.idCo !== course.idCo);
  
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error eliminando curso:', err);
  
        if (err.status === 404) {
          alert('NO SE ENCONTRO CURSO CON ESE ID');
        } else {
          alert('No se pudo eliminar el curso. Intente nuevamente.');
        }
      },
    });
  }

  showOnlyFoundCourse(course: Course): void {
    this.courses = [course];
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.modalActivo = null;
    this.selectedCourse = null;
    this.toggleModal(false);
  }

  private toggleModal(show: boolean): void {
    const el = document.getElementById('exampleModalToggle');
    if (!el) return;

    const instance = bootstrap.Modal.getOrCreateInstance(el);
    show ? instance.show() : instance.hide();
  }
}