import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-team-member-dialog',
    templateUrl: './team-member-dialog.component.html',
    styleUrls: ['./team-member-dialog.component.sass'],
    standalone: false
})
export class TeamMemberDialogComponent {

  teamMemberForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TeamMemberDialogComponent>,
    private fb: FormBuilder
  ) {
    this.teamMemberForm = this.fb.group({
      name: ['', [Validators.required]],
      color: [''],
      pictureUrl: ['']
    });
  }

  onClose(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

  onSave(): void {
    if (this.teamMemberForm.valid) {
      this.dialogRef.close(this.teamMemberForm.value); // Close the dialog and pass the form data
    }
  }
}
