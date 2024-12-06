import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team, TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-member-dialog',
  templateUrl: './team-member-dialog.component.html',
  styleUrls: ['./team-member-dialog.component.sass'],
  standalone: false
})
export class TeamMemberDialogComponent {

  teamMemberForm: FormGroup;
  teams: Team[] = [];

  constructor(
    private dialogRef: MatDialogRef<TeamMemberDialogComponent>,
    private fb: FormBuilder,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { teamMember: any; isEdit: boolean }
  ) {
    this.teamMemberForm = this.fb.group({
      name: ['', [Validators.required]],
      color: [''],
      pictureUrl: ['', [Validators.required]],
      selectedTeams: this.fb.array([]),
    });

    if (data && data.isEdit && data.teamMember) {
      this.teamMemberForm.patchValue({
        name: data.teamMember.name,
        color: data.teamMember.color,
        pictureUrl: data.teamMember.pictureUrl,
      });

      if (Array.isArray(data.teamMember.selectedTeams)) {
        const teamsArray = this.teamMemberForm.get('selectedTeams') as FormArray;
        data.teamMember.selectedTeams.forEach((team: Team) =>
          teamsArray.push(this.fb.control(team))
        );
      }
    }
  }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
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

  get selectedTeamsFormArray() {
    return this.teamMemberForm.get('selectedTeams') as FormArray;
  }

  // Add team to selected teams (FormArray)
  addTeam(team: Team) {
    const existingTeams = this.selectedTeamsFormArray.value;
    if (!existingTeams.some((t: Team) => t.id === team.id)) { // Assuming `id` uniquely identifies a team
      this.selectedTeamsFormArray.push(this.fb.control(team));
    }
  }
  

  // Remove team from selected teams (FormArray)
  removeTeam(team: Team) {
    const index = this.selectedTeamsFormArray.value.findIndex((t: Team) => t.id === team.id);
    if (index >= 0) {
      this.selectedTeamsFormArray.removeAt(index);
    }
  }
  
}
