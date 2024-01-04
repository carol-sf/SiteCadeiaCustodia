import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserType } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  form: FormGroup;
  UserType = UserType;
  selectedUserType: UserType = UserType.Admin;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      matriculation: ['', Validators.required],
      name: ['', Validators.required],
      office: ['', Validators.required],
      departament: ['', Validators.required],
      service: ['', Validators.required],
    });
  }

  selectUserType(userType: UserType) {
    this.selectedUserType = userType;
  }
}
