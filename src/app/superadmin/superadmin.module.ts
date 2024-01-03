import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SuperadminRoutes } from './superadmin.routing';
import { SuperadminComponent } from './superadmin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SuperadminComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutes,
    MatSidenavModule,
    MatIconModule,
  ]
})
export class SuperadminModule { }
