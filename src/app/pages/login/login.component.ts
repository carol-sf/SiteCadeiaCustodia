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
  filterOptions: Observable<string[]>
  officeControl = new FormControl('', Validators.required);

  officeOptions = ['']

  constructor(
    private service: UnitOfService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService
    ) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      office: ['', Validators.required],
    });

    this.filterOptions = this.officeControl.valueChanges.pipe(
      startWith(''), map(value => {
        return this.filter(value || '')
      }),
    )
  }

  private filter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.officeOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  async login() {
    this.form.get('office')?.setValue(this.officeControl.value!);
    this.form.markAllAsTouched();
    const officeIndex = this.officeOptions.indexOf(this.officeControl.value!);
    if(officeIndex != -1) {
      if(this.form.valid) {
        var office = this.form.get('office')
        var user = this.form.get('user')
        var password = this.form.get('password')

        var result : any = await this.service.userService.Login(office?.value, user?.value, password?.value)

        office?.setValue('')
        user?.setValue('')
        password?.setValue('')

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

  async changeOffice() {
    var office = this.form.get('office')?.value

    this.officeOptions = await this.service.officeService.FindOfficeList(office)
  }
}
