import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss'],
  standalone: false
})
export class AddTeamDialogComponent {
  teamForm: FormGroup;

  countries: string[] = [
    'BR',
    'PT'
  ];

  constructor(
    private dialogRef: MatDialogRef<AddTeamDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { team: any; isEdit: boolean }
  ) {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      holidayCalendar: [''],
    });

    if (data && data.isEdit && data.team) {
      this.teamForm.patchValue({
        name: data.team.name,
        description: data.team.description,
        holidayCalendar: data.team.holidayCalendar
      });
    }
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
