import { Routes, RouterModule } from '@angular/router';
import { SuperadminComponent } from './superadmin.component';
import { ProceduresComponent } from './pages/procedures/procedures.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserListComponent } from './pages/user-list/user-list.component';

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
      {
        path: 'usuarios',
        component: UserListComponent
      },
      {
        path: 'usuarios/cadastrar',
        component: UserRegisterComponent
      },
    ]
  },
];

export const SuperadminRoutes = RouterModule.forChild(routes);
