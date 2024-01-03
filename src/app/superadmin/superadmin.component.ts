import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent {
  expanded: boolean = true;

  constructor(
    private router: Router,
  ) {}

  toggleMenu() {
    this.expanded = !this.expanded;
  }

  getMenuWidth(): string {
    return this.expanded ? '250px' : '65px';
  }

  getContentMargin(): string {
    return this.expanded ? '270px' : '85px';
  }

  goToProfilePage() {
    this.router.navigate(['superadmin/perfil']);
  }
}
