import { Component } from '@angular/core';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent {
  expanded: boolean = true;

  toggleMenu() {
    this.expanded = !this.expanded;
  }

  getMenuWidth() {
    return this.expanded ? '250px' : '65px';
  }
}
