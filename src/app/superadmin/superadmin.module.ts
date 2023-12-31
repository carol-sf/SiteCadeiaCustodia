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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserListComponent } from './pages/user-list/user-list.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalInactivateReasonComponent } from './components/modal-inactivate-reason/modal-inactivate-reason.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    SuperadminComponent,
    ProceduresComponent,
    UserRegisterComponent,
    UserListComponent,
    ModalInactivateReasonComponent,
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
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class SuperadminModule { }
