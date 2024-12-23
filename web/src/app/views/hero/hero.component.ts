import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-hero',
  imports: [ModalComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  onSphereClick(label: string): void {
    alert(`You clicked on: ${label}`);
  }
}
