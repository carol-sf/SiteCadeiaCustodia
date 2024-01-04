import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-arquive-confirmation',
  templateUrl: './modal-arquive-confirmation.component.html',
  styleUrls: ['./modal-arquive-confirmation.component.scss']
})
export class ModalArquiveConfirmationComponent {

  constructor(
    private dialogRef: MatDialogRef<ModalArquiveConfirmationComponent>
  ) { }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
