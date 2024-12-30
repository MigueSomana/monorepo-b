import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GetApiService } from '../../services/get-api.service';
import { CommonModule } from '@angular/common'
import { Contact } from '../../models/contact';

declare var bootstrap: any;

@Component({
  selector: 'app-form-create',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.scss'
})

export class FormCreateComponent implements OnInit {
  //Variables
  contactForm: FormGroup | any;
  submitted = false;
  alertMessage = '';
  alertClass = '';
  alertIcon = '';

  //Constructor formulario y servicios de la api
  constructor(
    private formBuilder: FormBuilder,
    private contactService: GetApiService
  ) {}

  //Constructor formulario y servicios de la api
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required]
    });
  }

  //Obtener los controles del formulario
  get f() {
    return this.contactForm.controls;
  }

  //Resetear el formulario
  resetForm() {
    this.submitted = false;
    this.contactForm.reset();
    this.alertMessage = '';
    this.alertClass = '';
    this.alertIcon = '';
  }

  //Cerrar el modal
  private closeModal() {
    const modalElement = document.getElementById('contacto');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
  
  //Enviar a la api el nuevo contacto y emitir alertas
  onSubmit() {
    this.submitted = true;
    this.alertMessage = '';

    if (this.contactForm.invalid) {
      return;
    }

    const newContact: Omit<Contact, '_id'> = {
      email: this.f['email'].value,
      name: this.f['name'].value,
      balance: 0
    };

    this.contactService.createContact(newContact).subscribe({
      next: () => {
        setTimeout(() => {
          this.closeModal();
          this.resetForm();
        }, 1000);
        this.showAlert(
          '¡Contacto creado exitosamente!',
          'alert alert-success d-flex align-items-center',
          'bi bi-check-circle-fill'
        );
      },
      error: (error) => {
        const errorMessage = error.error.message || 'El email ya existe en contactos';
        this.showAlert(
          errorMessage,
          'alert alert-danger d-flex align-items-center',
          'bi bi-exclamation-octagon-fill'
        );
      }
    });
  }

  //Complementario de alertas
  private showAlert(message: string, alertClass: string, icon: string) {
    this.alertMessage = message;
    this.alertClass = alertClass;
    this.alertIcon = icon;
  }
}