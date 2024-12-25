import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Contact } from '../../models/contact';
import { Operation, OperationType } from '../../models/operation';
import { GetApiService } from '../../services/get-api.service';

@Component({
  selector: 'app-gestionar',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './gestionar.component.html',
  styleUrl: './gestionar.component.scss',
})
export class GestionarComponent implements OnInit {
  //Variables
  contacts: Contact[] = [];
  operations: any[] = [];
  idSelect: any;
  operationForm: FormGroup;
  error = '';
  submitted = false;
  selectedContactId: string = '';
  alertMessage = '';
  alertClass = '';
  alertIcon = '';

  //Constructor formulario y servicios de la api
  constructor(private contactService: GetApiService, private fb: FormBuilder) {
    this.operationForm = this.fb.group({
      type: ['BUY', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  //Al iniciar cargar los contactos e inicializar el formulario
  ngOnInit() {
    this.loadContacts();
    this.updateFormState();
  }

  //Actualizar constantemente el select de los contactos
  onFocus() {
    this.loadContacts();
    this.updateFormState();
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
    this.updateFormState();
  }

  //Activar o desactivar los inputs
  updateFormState() {
    if (!this.selectedContactId) {
      this.operationForm.get('type')?.disable();
      this.operationForm.get('amount')?.disable();
    } else {
      this.operationForm.get('type')?.enable();
      this.operationForm.get('amount')?.enable();
    }
  }

  //Hacer get de los contactos para el select
  loadContacts(callback?: () => void) {
    this.contactService.getContacts().subscribe((result: any) => {
      this.contacts = result.data;
  
      // Ejecutar el callback si existe
      if (callback) {
        callback();
      }
    });
  }

  //Hacer get de las operaciones del contacto para la tabla
  loadOperations(contactId: string) {
    this.contactService
      .getOperationsByContact(contactId)
      .subscribe((result: any) => {
        this.operations = result.data;
      });
  }

  // Get para acceder a los controles del formulario
  get f() {
    return this.operationForm.controls;
  }

  //Enviar a la api la nueva operacion y actualizar la tabla, ademas de alertas
  onSubmit() {
    this.submitted = true;

    if (this.operationForm.invalid || !this.idSelect?._id) {
      return;
    }

    const newOperation: Omit<Operation, '_id' | 'createdAt'> = {
      contactId: this.idSelect._id,
      type: this.operationForm.get('type')?.value as OperationType,
      amount: this.operationForm.get('amount')?.value,
    };

    this.contactService.createOperation(newOperation).subscribe({
      next: () => {
        this.operationForm.get('amount')?.reset();
        this.alertMessage = 'Operación realizada con éxito';
        this.alertClass = 'alert alert-success d-flex align-items-center';
        this.alertIcon = 'bi bi-check-circle-fill';

        // Recargar contactos y actualizar balance
        this.loadContacts(() => {
          this.idSelect =
            this.contacts.find(
              (contact) => contact._id === this.idSelect._id
            ) || null;
        });

        if (this.idSelect?._id) {
          this.loadOperations(this.idSelect._id);
        }
      },
      error: (err) => {
        console.error('Error creating operation:', err);
        this.error = 'Error al crear la operación';
        this.alertMessage = 'Error al crear la operación';
        this.alertClass = 'alert alert-danger d-flex align-items-center';
        this.alertIcon = 'bi bi-exclamation-octagon-fill';
      },
    });
  }
}
