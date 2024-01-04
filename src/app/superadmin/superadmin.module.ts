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
import { ModalArquiveConfirmationComponent } from './components/modal-arquive-confirmation/modal-arquive-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    SuperadminComponent,
    ProceduresComponent,
    UserRegisterComponent,
    UserListComponent,
    ModalArquiveConfirmationComponent,
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
  ]
})
export class SuperadminModule { }
