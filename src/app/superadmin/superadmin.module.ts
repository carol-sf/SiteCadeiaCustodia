import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutes } from './superadmin.routing';
import { SuperadminComponent } from './superadmin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProceduresComponent } from './pages/procedures/procedures.component';


@NgModule({
  declarations: [
    SuperadminComponent,
    ProceduresComponent,
  ],
  imports: [
    CommonModule,
    SuperadminRoutes,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ]
})
export class SuperadminModule { }
