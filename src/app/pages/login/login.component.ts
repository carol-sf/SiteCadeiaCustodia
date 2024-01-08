import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'src/app/interfaces/cookie';
import { UnitOfService } from 'src/app/services/unitOfService/unit-of-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private service: UnitOfService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private cookie: CookieService
    ) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if(this.cookie.get("type")) this.cookie.delete("type")
    if(this.cookie.get("name")) this.cookie.delete("name")
  }

  @HostListener('document:keydown.enter', ['$event'])
  async login() {
    if(this.form.valid) {
      var user = this.form.get('user')
      var password = this.form.get('password')

      var result : Cookie = await this.service.userService.Login(user?.value, password?.value)

      user?.setValue('')
      password?.setValue('')

      switch(result.type) {
        case 2:
          this.cookie.set("type", result.type.toString())
          this.cookie.set("name", result.name)
          this.toast.success('Login efetuado com sucesso')
          this.router.navigate(['./superadmin'])
          break
        default:
          this.toast.error(result.name)
      }
    }
  }
}
