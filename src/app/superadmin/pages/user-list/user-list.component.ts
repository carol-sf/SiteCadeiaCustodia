import { User, UserType, getUserTypeName } from 'src/app/interfaces/user';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, map, startWith } from 'rxjs';
import { UnitOfService } from 'src/app/services/unitOfService/unit-of-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalArquiveConfirmationComponent } from '../../components/modal-archive-confirmation/modal-archive-confirmation.component';

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
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'id',
    'name',
    'office',
    'lab',
    'role',
    'active',
    'edit',
    'archive'
  ];
  getUserTypeName = getUserTypeName;

  usersTest: User[] = [
    {
      id: '1',
      matricula: '54321',
      nome: 'Ana Souza',
      email: 'ana@email.com',
      senha: 'senhaana',
      posto: 'Operador',
      ativo: false,
      tipo: UserType.Operador,
      departamento: 'Segurança',
      servicos: ['Serviço D', 'Serviço E']
    },
    {
      id: '2',
      matricula: '13579',
      nome: 'Carlos Ferreira',
      email: 'carlos@email.com',
      senha: 'senhacarlos',
      posto: 'Perito',
      ativo: false,
      tipo: UserType.Perito,
      departamento: 'Ciências Forenses',
      servicos: ['Serviço F']
    },
    {
      id: '3',
      matricula: '24680',
      nome: 'Fernanda Oliveira',
      email: 'fernanda@email.com',
      senha: 'senhafernanda',
      posto: 'Admin',
      ativo: true,
      tipo: UserType.Admin,
      departamento: 'Recursos Humanos',
      servicos: ['Serviço G']
    },
    {
      id: '4',
      matricula: '98765',
      nome: 'Rafael Costa',
      email: 'rafael@email.com',
      senha: 'senharafael',
      posto: 'SuperAdmin',
      ativo: true,
      tipo: UserType.SuperAdmin,
      departamento: 'Administração',
      servicos: ['Serviço H', 'Serviço I']
    },
    {
      id: '5',
      matricula: '11223',
      nome: 'Mariana Santos',
      email: 'mariana@email.com',
      senha: 'senhamariana',
      posto: 'Operador',
      ativo: true,
      tipo: UserType.Operador,
      departamento: 'Atendimento ao Cliente',
      servicos: ['Serviço J']
    },
    {
      id: '6',
      matricula: '33445',
      nome: 'Gustavo Lima',
      email: 'gustavo@email.com',
      senha: 'senhagustavo',
      posto: 'Perito',
      ativo: true,
      tipo: UserType.Perito,
      departamento: 'Ciências Forenses',
      servicos: ['Serviço K']
    },
    {
      id: '7',
      matricula: '55667',
      nome: 'Juliana Castro',
      email: 'juliana@email.com',
      senha: 'senhajuliana',
      posto: 'Admin',
      ativo: true,
      tipo: UserType.Admin,
      departamento: 'Recursos Humanos',
      servicos: ['Serviço L']
    },
    {
      id: '8',
      matricula: '77889',
      nome: 'Lucas Almeida',
      email: 'lucas@email.com',
      senha: 'senhalucas',
      posto: 'SuperAdmin',
      ativo: true,
      tipo: UserType.SuperAdmin,
      departamento: 'Administração',
      servicos: ['Serviço M', 'Serviço N']
    },
    {
      id: '9',
      matricula: '99000',
      nome: 'Patrícia Pereira',
      email: 'patricia@email.com',
      senha: 'senhapatricia',
      posto: 'Operador',
      ativo: true,
      tipo: UserType.Operador,
      departamento: 'Segurança',
      servicos: ['Serviço O']
    },
    {
      id: '10',
      matricula: '11223',
      nome: 'Renato Silva',
      email: 'renato@email.com',
      senha: 'senharenato',
      posto: 'Perito',
      ativo: true,
      tipo: UserType.Perito,
      departamento: 'Ciências Forenses',
      servicos: ['Serviço P']
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: UnitOfService,
    private dialog: MatDialog,
  ) {
    this.filterForm = this.formBuilder.group({
      search: [''],
      lab: [''],
      userType: [''],
      office: [''],
    });
  }

  async ngOnInit() {
    this.dataSource.data = this.usersTest;
    this.officeOptions = await this.service.officeService.FindOfficeList('');

    this.officeFilterOptions = this.filterForm.get('office')!.valueChanges.pipe(
      startWith(''), map(value => {
        return this.officeFilter(value || '')
      }),
    );
  }

  private officeFilter(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.officeOptions.filter(option => option.toLowerCase().includes(searchValue));
  }

  archiveUser(user: User) {
    this.dialog
      .open(ModalArquiveConfirmationComponent, {
        width: '450px',
        height: '200px',
      })
      .afterClosed()
      .subscribe({
        next: (result: boolean) => {
          if (result) {
            // arquivar usuário
          }
        },
      });
  }

}
