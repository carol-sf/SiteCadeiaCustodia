import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { User, UserType } from 'src/app/interfaces/user';
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
  departamentOptions!: string[];
  serviceOptions!: string[];
  sectionOptions!: string[];
  departamentFilterOptions!: Observable<string[]>;
  serviceFilterOptions!: Observable<string[]>;
  officeFilterOptions!: Observable<string[]>;
  sectionFilterOptions!: Observable<string[]>;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: UnitOfService,
    private toast: ToastrService,
    private router: Router,
    private cookie: CookieService
  ) {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      matriculation: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      office: ['', Validators.required],
      departament: ['', Validators.required],
      services: ['', Validators.required],
      sections: ['']
    });
  }

  async ngOnInit() {
    if(this.cookie.get("type") != "2") {
      this.toast.error("Não autorizado")
      this.router.navigate(["/login"]) 
    }
    else {
      this.officeOptions = await this.service.officeService.FindOfficeList('');
      this.departamentOptions= ['Criminal', 'Médico Legal', 'IIFP'];

      this.officeFilterOptions = this.form.get('office')!.valueChanges.pipe(
        startWith(''), map(value => {
          return this.officeFilter(value || '')
        }),
      );

      this.form.get('departament')!.valueChanges.subscribe(value => {
        switch(value) {
          case 'Criminal':
            this.serviceOptions = ['Serviço de perícia de arma de fogo', 'Laboratório de entorpecentes'];
            break;
          case 'Médico Legal':
            this.serviceOptions = ['Laboratório de hematologia', 'Laboratório de toxicologia', 'Laboratório de anatomo-patologia'];
            break;
          case 'IIFP':
            this.serviceOptions = ['Movimentação de material'];
            break;
          default:
            this.serviceOptions = [''];
        }
      });

      this.form.get('services')!.valueChanges.subscribe(value => {
        if(value.includes('Serviço de perícia de arma de fogo')) {
          this.sectionOptions = ['Confronto', 'Descrição'];
        }
      });  
    }
  }

  selectUserType(userType: UserType) {
    this.selectedUserType = userType;
  }

  private officeFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.officeOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  private departamentFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.departamentOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  private serviceFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.serviceOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  private sectionFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.sectionOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  async registerUser() {
    this.form.markAsTouched()
    if(this.form.valid) {
      var user : User = {
        id: this.form.get('id')?.value,
        matricula: this.form.get('matriculation')?.value,
        nome: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        senha: this.form.get('password')?.value,
        posto: this.form.get('office')?.value,
        ativo: true,
        tipo: this.selectedUserType,
        departamento: this.selectedUserType != UserType.Operador ? this.form.get('departament')?.value : '',
        servicos: this.selectedUserType != UserType.Operador ? this.form.get('services')?.value : [],
        sections: this.form.get('sections')?.value
      }

      var result: any = await this.service.userService.CreateUser(user)

      this.toast.success(result)
      this.router.navigate(['./superadmin/usuarios'])
    }
  }
}
