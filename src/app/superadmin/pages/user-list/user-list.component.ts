import { ReadUserDTO, User, UserType, getUserTypeName } from 'src/app/interfaces/user';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UnitOfService } from 'src/app/services/unitOfService/unit-of-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ModalInactivateReasonComponent } from '../../components/modal-inactivate-reason/modal-inactivate-reason.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  filterForm: FormGroup;
  labOptions: string[] = [
    'Perícia de arma de fogo',
    'Entorpecentes',
    'Hematologia',
    'Toxicologia',
    'Anatomo-patologia',
    'Movimentação de material'
  ]
  userTypeOptions: string[] = ['Super Admin', 'Admin', 'Perito', 'Operador'];
  officeOptions!: string[];
  officeFilterOptions!: Observable<string[]>;
  dataSource = new MatTableDataSource<ReadUserDTO>();
  displayedColumns: string[] = [
    'id',
    'name',
    'office',
    'lab',
    'role',
    'active',
    'edit'
  ];
  getUserTypeName = getUserTypeName;

  usersTest: ReadUserDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: UnitOfService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private cookie: CookieService,
    private router: Router
  ) {
    this.filterForm = this.formBuilder.group({
      search: [''],
      lab: [''],
      userType: [''],
      office: [''],
    });
  }

  async ngOnInit() {
    if(this.cookie.get("type") != "2") {
      this.toast.error("Não autorizado")
      this.router.navigate(["/login"]) 
    }
    else {
      this.FindUsers()

      this.officeOptions = await this.service.officeService.FindOfficeList('');

      this.officeFilterOptions = this.filterForm.get('office')!.valueChanges.pipe(
        startWith(''), map(value => {
          return this.officeFilter(value || '')
        }),
      );
    }    
  }

  private officeFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.officeOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  async FindUsers() {
    var result = await this.service.userService.FindUsers()

    if(result.length === 0) this.toast.error("Nenhum usuario encontrado")

    this.dataSource.data = result
  }

  activeToggleChange(event: MatSlideToggleChange) {
    if(!event.checked) {
      // chamar modal de motivo
      this.dialog.open(ModalInactivateReasonComponent);
      console.log('ativo!');
    } else {
      // exibir aviso dizendo que a ação não é permitida?
    }
  }

}
