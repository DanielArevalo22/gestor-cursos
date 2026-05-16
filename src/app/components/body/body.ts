import { Component, ViewChild } from '@angular/core';
import { CardSubject } from '../card-subject/card-subject';
import { FormCreate } from '../form-create/form-create';
import { FormEdit } from '../form-edit/form-edit';
import { NgFor, NgIf } from '@angular/common';
import Course from '../../models/Course';
import { Courses } from '../../services/courses';

@Component({
  selector: 'app-body',
  imports: [CardSubject, FormCreate, FormEdit, NgIf, NgFor],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {

  @ViewChild(CardSubject) cardSubject!: CardSubject;
  
  modalActivo: 'c' | 'e' | null = null;
  courses : Course[] = [];

  constructor(private courService : Courses){

  }

  ngOnInit() : void{
    this.courService.findAllCoures().subscribe({
      next: (course) =>{
        this.courses = course;
        console.log(this.courses);
      },
      error: (err) =>{
        console.log("ERROR OBTENIENDO APIS", err);
      }
    })
  } 

  ngAfterViewInit(): void {
    this.cardSubject.editClick.subscribe(() => {
      this.openEditModal();
    });
  }

  openCreateModal() { 
    this.modalActivo = 'c'; 
  }

  openEditModal() { 
    this.modalActivo = 'e'; 
  }

  closeModal() { 
    this.modalActivo = null; 
  }
}