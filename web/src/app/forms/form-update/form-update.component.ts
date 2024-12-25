import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GetApiService } from '../../services/get-api.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-form-update',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.scss',
})

export class FormUpdateComponent implements OnInit {
  //Variables
  contactForm: FormGroup | any;
  submitted = false;
  contacts: Contact[] = [];
  selectedContactId: string = '';
  idSelect: any;
  alertMessage = '';
  alertClass = '';
  alertIcon = '';

  //Constructor formulario y servicios de la api
  constructor(
    private formBuilder: FormBuilder,
    private contactService: GetApiService
  ) {}

  //Al iniciar cargar los contactos e inicializar el formulario, ademas de desactivar los inputs
  ngOnInit() {
    this.loadContacts();
    this.initForm();
    this.contactForm.get('name')?.disable();
    this.contactForm.get('email')?.disable();
  }

  //Actualizar constantemente el select de los contactos
  onFocus() {
    this.loadContacts();
  }

  //Cuando es seleccionado un contacto, cargar valores actuales en los inputs
  onContactSelect(e: any) {
    this.selectedContactId = e.target.value;

    const selectedContact = this.contacts.find(
      (contact) => contact._id === e.target.value
    );

    if (selectedContact) {
      this.contactForm.patchValue({
        name: selectedContact.name,
        email: selectedContact.email,
      });
      this.contactForm.get('name')?.enable();
      this.contactForm.get('email')?.disable();
    } else {
      this.contactForm.patchValue({
        name: '',
        email: '',
      });
    }
  }

  //Inicializar el formulario
  initForm() {
    this.contactForm = this.formBuilder.group({
      contactId: [''],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
    });
  }

  //Hacer get de los contactos para el select
  loadContacts() {
    this.contactService.getContacts().subscribe((result: any) => {
      this.contacts = result.data;
    });
  }

  // Get para acceder a los controles del formulario
  get f() {
    return this.contactForm.controls;
  }

  //Enviar a la api el contacto para actualizar y emitir alertas
  onSubmit(e: any) {
    this.submitted = true;
    this.alertMessage = '';

    if (this.contactForm.invalid) {
      return;
    }

    const contactData = {
      email: this.f['email'].value,
      name: this.f['name'].value,
    };

    this.contactService
      .updateContact(this.selectedContactId, contactData)
      .subscribe({
        next: () => {
          this.contactForm.patchValue({
            name: contactData.name,
            email: contactData.email,
          });
          this.loadContacts();
          this.showAlert(
            '¡Contacto actualizado exitosamente!',
            'alert alert-success d-flex align-items-center',
            'bi bi-check-circle-fill'
          );
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error al actualizar el contacto';
          this.showAlert(
            errorMessage,
            'alert alert-warning d-flex align-items-center',
            'bi bi-exclamation-octagon-fill'
          );
        },
      });
  }

  //Complementario de mostrar alertas
  private showAlert(message: string, alertClass: string, icon: string) {
    this.alertMessage = message;
    this.alertClass = alertClass;
    this.alertIcon = icon;
  }
}
