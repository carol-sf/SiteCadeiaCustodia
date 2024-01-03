import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  filterOptions: Observable<string[]>
  officeControl = new FormControl('', Validators.required);

  officeOptions = ['Posto 1', 'Posto 2', 'Posto 3', 'Posto 4', 'Posto 5', 'Posto 6', 'Posto 7', 'Posto 8']

  constructor(private formBuilder: FormBuilder) {
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

  login() {
    this.form.get('office')?.setValue(this.officeControl.value!);
    this.form.markAllAsTouched();
    console.log(this.form.valid);
    const officeIndex = this.officeOptions.indexOf(this.officeControl.value!);
    if(officeIndex != -1) {
      if(this.form.valid) {
        console.log('Logando...');
      }
    }
  }
}
