import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SuperadminRoutes } from './superadmin.routing';
import { SuperadminComponent } from './superadmin.component';



@NgModule({
  declarations: [
    SuperadminComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutes,
  ]
})
export class SuperadminModule { }
