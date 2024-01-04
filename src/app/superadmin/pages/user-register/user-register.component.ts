import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UserType } from 'src/app/interfaces/user';
import { UnitOfService } from 'src/app/services/unitOfService/unit-of-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  form: FormGroup;
  UserType = UserType;
  selectedUserType: UserType = UserType.Admin;
  officeOptions!: string[];
  departamentOptions: string[] = ['Criminal', 'Médico Legal', 'IIFP'];
  serviceOptions: string[] = [
    'Serviço de perícia de arma de fogo',
    'Laboratório de entorpecentes',
    'Laboratório de hematologia',
    'Laboratório de toxicologia',
    'Laboratório de anatomo-patologia',
    'Movimentação de material',
  ];
  departamentFilterOptions: Observable<string[]>;
  serviceFilterOptions: Observable<string[]>;
  officeFilterOptions!: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private service: UnitOfService,
  ) {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      matriculation: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      name: ['', Validators.required],
      office: ['', Validators.required],
      departament: ['', Validators.required],
      service: ['', Validators.required],
    });

    this.departamentFilterOptions = this.form.get('departament')!.valueChanges.pipe(
      startWith(''), map(value => {
        return this.departamentFilter(value || '')
      }),
    );

    this.serviceFilterOptions = this.form.get('service')!.valueChanges.pipe(
      startWith(''), map(value => {
        return this.serviceFilter(value || '')
      }),
    );
  }

  async ngOnInit() {
    this.officeOptions = await this.service.officeService.FindOfficeList('');

    this.officeFilterOptions = this.form.get('office')!.valueChanges.pipe(
      startWith(''), map(value => {
        return this.officeFilter(value || '')
      }),
    );

  }

  selectUserType(userType: UserType) {
    this.selectedUserType = userType;
  }

  private departamentFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.departamentOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  private serviceFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.serviceOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  private officeFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.officeOptions.filter(option => option.toLowerCase().includes(searchValue));
  }
}
