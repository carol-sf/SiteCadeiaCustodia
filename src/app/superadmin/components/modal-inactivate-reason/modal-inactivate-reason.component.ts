import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-inactivate-reason',
  templateUrl: './modal-inactivate-reason.component.html',
  styleUrls: ['./modal-inactivate-reason.component.scss']
})
export class ModalInactivateReasonComponent {
  inactivateForm: FormGroup;
  periodForm: FormGroup;
  reasonsOptions: string[] = ['Férias', 'Licença Médica', 'Afastamento', 'Aposentadoria'];

  constructor(
    private dialogRef: MatDialogRef<ModalInactivateReasonComponent>,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.inactivateForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });

    this.periodForm = formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.dateAdapter.setLocale('pt-BR');
  }

  cancel() {
    this.dialogRef.close();
    window.location.reload();
  }

  confirm() {
    if(this.inactivateForm.valid ) {
      if(this.inactivateForm.get('reason')?.value != 'Afastamento') {
        if(this.periodForm.valid) {
          // registrar com a data
          console.log(this.inactivateForm.get('reason')?.value);
          console.log(this.periodForm.value);
        }
      } else {
        // registrar sem a data
      }
      // editar o campo 'ativo' do usuário para 'inativo'
      this.dialogRef.close();
      // window.location.reload();
    }
  }
}
