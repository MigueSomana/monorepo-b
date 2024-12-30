import { Routes } from '@angular/router';
import { HeroComponent } from './views/hero/hero.component';

//Solo tendra una vista principal, y lo demas seran modals
export const routes: Routes = [
      {path: '', redirectTo: 'inicio', pathMatch: 'full'},
      {path: 'inicio', component: HeroComponent}
];
