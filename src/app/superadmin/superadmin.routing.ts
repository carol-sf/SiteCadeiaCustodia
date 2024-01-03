import { Routes, RouterModule } from '@angular/router';
import { SuperadminComponent } from './superadmin.component';
import { ProceduresComponent } from './pages/procedures/procedures.component';

const routes: Routes = [
  {
    path: 'superadmin',
    component: SuperadminComponent,
    children: [
      {
        path: '',
        redirectTo: 'procedimentos',
        pathMatch: 'full'
      },
      {
        path: 'procedimentos',
        component: ProceduresComponent
      },
    ]
  },
];

export const SuperadminRoutes = RouterModule.forChild(routes);
