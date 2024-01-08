import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent {
  expanded: boolean = true;

  constructor(
    private router: Router,
    private cookie: CookieService
  ) {}

  userName = ''

  ngOnInit() {
    this.userName = this.cookie.get('name')
  }

  goToProfilePage() {
    this.router.navigate(['superadmin/perfil']);
  }

  toggleMenu() {
    this.expanded = !this.expanded;
  }

  getMenuWidth(): string {
    return this.expanded ? '250px' : '65px';
  }

  getContentMargin(): string {
    return this.expanded ? '270px' : '85px';
  }

  // Para a versão retrátil do menu

  getMenuPadding(): string {
    return this.expanded ? '20px' : '20px 2px';
  }

  getLogoWidth(): string {
    return this.expanded ? '60%' : '90%';
  }

  getHeaderMenuHeight(): string {
    return this.expanded ? '30%' : '20%';
  }
}
