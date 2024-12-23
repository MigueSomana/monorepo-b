import { Routes } from '@angular/router';
import { HeroComponent } from './views/hero/hero.component';
import { GestionarComponent } from './views/gestionar/gestionar.component';
import { BalanceComponent } from './views/balance/balance.component';
import { PerfilComponent } from './views/perfil/perfil.component';

export const routes: Routes = [
      {path: '', redirectTo: 'hero', pathMatch: 'full'},
      {path: 'hero', component: HeroComponent},
      {path: 'contacts', component: GestionarComponent},
      {path: 'balance', component: BalanceComponent},
      {path: 'perfil', component: PerfilComponent}
];
