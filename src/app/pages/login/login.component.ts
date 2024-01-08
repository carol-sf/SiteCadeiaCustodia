import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
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
    private toast: ToastrService
    ) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    if(this.form.valid) {
      var user = this.form.get('user')
      var password = this.form.get('password')

      console.log(password?.value)

      var result : any = await this.service.userService.Login(user?.value, password?.value)

      switch(result) {
        case 2:
          this.toast.success('Login efetuado com sucesso')
          this.router.navigate(['./superadmin'])
          break
        default:
          this.toast.error(result)
      }
    }
  }
}
