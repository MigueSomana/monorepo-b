import { Component } from '@angular/core';
import { FormCreateComponent } from '../../forms/form-create/form-create.component';
import { FormUpdateComponent } from '../../forms/form-update/form-update.component';

@Component({
  selector: 'app-modal',
  imports: [FormCreateComponent, FormUpdateComponent ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

}
