import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent {

  constructor(
    private cookie: CookieService,
    private router: Router,
    private toast: ToastrService
  ) {

  }

  ngOnInit() {
    if(this.cookie.get("type") != "2") {
      this.toast.error("Não autorizado")
      this.router.navigate(["/login"]) 
    }
  }
}
