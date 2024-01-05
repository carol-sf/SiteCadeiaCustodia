import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-inactivate-reason',
  templateUrl: './modal-inactivate-reason.component.html',
  styleUrls: ['./modal-inactivate-reason.component.scss']
})
export class ModalInactivateReasonComponent {
  inactivateForm: FormGroup;
  reasonsOptions: string[] = ['Férias', 'Licença Médica', 'Afastamento', 'Aposentadoria']

  constructor(
    private dialogRef: MatDialogRef<ModalInactivateReasonComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.inactivateForm = this.formBuilder.group({
      reason: ['', Validators.required],
      period: ['', Validators.required],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    // registrar motivo e fechar
    this.dialogRef.close();
  }
}
