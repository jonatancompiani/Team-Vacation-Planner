import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { teamMember: any; isEdit: boolean }
  ) {
    this.teamMemberForm = this.fb.group({
      name: ['', [Validators.required]],
      color: [''],
      pictureUrl: ['']
    });

    // If in edit mode, set the form values
    if (data && data.isEdit && data.teamMember) {
      this.teamMemberForm.patchValue({
        name: data.teamMember.name,
        color: data.teamMember.color,
        pictureUrl: data.teamMember.pictureUrl
      });
    }

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
