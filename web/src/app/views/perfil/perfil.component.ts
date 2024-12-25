import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact';
import { Operation } from '../../models/operation';
import { GetApiService } from '../../services/get-api.service';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  //Variables
  contacts: Contact[] = [];
  selectedContactId: string = '';
  idSelect: any;
  operations: any[] = [];
  alertMessage = '';
  alertClass = '';
  alertIcon = '';

  //Constructor servicios de la api
  constructor(private contactService: GetApiService) {}

  //Al iniciar cargar los contactos 
  ngOnInit() {
    this.loadContacts();
  }

  //Actualizar constantemente el select de los contactos
  onFocus() {
    this.loadContacts();
  }

  //Cuando es seleccionado un contacto, cargar sus operaciones
  onContactSelect(e: any) {
    const selectedId = e.target.value;
    this.selectedContactId = selectedId;
    if (this.idSelect) {
      this.selectedContactId = this.idSelect._id; 
      this.loadOperations(this.selectedContactId);
    } else {
      this.selectedContactId = '';
    }
  }

  //Hacer get de los contactos para el select
  loadContacts() {
    this.contactService.getContacts().subscribe((result: any) => {
      this.contacts = result.data;
    });
  }

  //Hacer get de las operaciones del contacto para la tabla
  loadOperations(contactId: string) {
    this.operations = []; 
    this.contactService
      .getOperationsByContact(contactId)
      .subscribe((result: any) => {
        if (result.data && result.data.length > 0) {
          this.operations = result.data; 
          this.alertMessage = ''; 
        } else {
          this.operations = [];
          this.showAlert(
            'El contacto seleccionado no tiene operaciones.',
            'alert alert-warning d-flex align-items-center',
            'bi bi-exclamation-octagon-fill'
          );
        }
      });
  }

  //Complementario de las alertas
  private showAlert(message: string, alertClass: string, icon: string) {
    this.alertMessage = message;
    this.alertClass = alertClass;
    this.alertIcon = icon;
  }
}
