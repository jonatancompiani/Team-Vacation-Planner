import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.sass'],
  standalone: false
})
export class AddTeamDialogComponent {
  teamForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddTeamDialogComponent>,
    private fb: FormBuilder
  ) {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  onClose(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

  onSave(): void {
    if (this.teamForm.valid) {
      this.dialogRef.close(this.teamForm.value); // Close the dialog and pass the form data
    }
  }
}
