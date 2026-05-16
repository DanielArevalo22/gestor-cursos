import { Component, ViewChild } from '@angular/core';
import { CardSubject } from '../card-subject/card-subject';
import { FormCreate } from '../form-create/form-create';
import { FormEdit } from '../form-edit/form-edit';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-body',
  imports: [CardSubject, FormCreate, FormEdit, NgIf],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {

  @ViewChild(CardSubject) cardSubject!: CardSubject;
  
  modalActivo: 'c' | 'e' | null = null;

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