import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { BalanceComponent } from '../balance/balance.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { InstructComponent } from '../instruct/instruct.component';

@Component({
  selector: 'app-hero',
  imports: [ ModalComponent, BalanceComponent, PerfilComponent, InstructComponent ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent {
  
}
