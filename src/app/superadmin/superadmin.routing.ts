import { Routes, RouterModule } from '@angular/router';
import { SuperadminComponent } from './superadmin.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'superadmin',
    component: SuperadminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
    ]
  },
];

export const SuperadminRoutes = RouterModule.forChild(routes);
