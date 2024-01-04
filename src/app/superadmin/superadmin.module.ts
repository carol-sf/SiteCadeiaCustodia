import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutes } from './superadmin.routing';
import { SuperadminComponent } from './superadmin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProceduresComponent } from './pages/procedures/procedures.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuperadminComponent,
    ProceduresComponent,
    UserRegisterComponent,
  ],
  imports: [
    CommonModule,
    SuperadminRoutes,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class SuperadminModule { }
