import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamMember } from 'src/app/models/TeamMember';
import { TeamMemberService } from 'src/app/services/teamMember.service';
import { TeamMemberDialogComponent } from '../team-member-dialog/team-member-dialog.component';

@Component({
    selector: 'app-team-members',
    templateUrl: './team-members.component.html',
    styleUrls: ['./team-members.component.sass'],
    standalone: false
})
export class TeamMembersComponent {

  dataSource: TeamMember[] = [];

  constructor(
    public dialog: MatDialog, 
    private teamMemberService: TeamMemberService,
    private snackBar: MatSnackBar) {
    this.teamMemberService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  displayedColumns: string[] = ['color', 'name', 'pictureUrl', 'action'];
  
  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamMemberService.getAll().subscribe((data) => {
      this.dataSource = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      width: '400px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamMemberService.create(result).then(() => {
          this.snackBar.open('Team added successfully!', 'Close', { duration: 3000 });
        });
      }
    });
  }

  delete(id: string) {
    this.teamMemberService.delete(id).then(() => {
      this.snackBar.open('Team deleted successfully!', 'Close', { duration: 3000 });
    });
  }

  edit(teamMember: TeamMember) {
    const dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      width: '400px',
      data: { teamMember, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamMemberService.update(teamMember.id!, result).then(() => {
          this.snackBar.open('Team updated successfully!', 'Close', { duration: 3000 });
        });
      }
    });
  }

}
