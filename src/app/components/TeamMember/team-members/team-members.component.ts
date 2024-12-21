import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamMember } from 'src/app/models/TeamMember';
import { TeamMemberService, UserEnriched } from 'src/app/services/teamMember.service';
import { TeamMemberDialogComponent } from '../team-member-dialog/team-member-dialog.component';
import { TeamAssociationService } from 'src/app/services/teamAssociations.service';
import { Team } from 'src/app/services/team.service';


@Component({
    selector: 'app-team-members',
    templateUrl: './team-members.component.html',
    styleUrls: ['./team-members.component.scss'],
    standalone: false
})
export class TeamMembersComponent {

  dataSource: UserEnriched[] = [];

  constructor(
    public dialog: MatDialog, 
    private teamMemberService: TeamMemberService,
    private teamAssociationService: TeamAssociationService,
    private snackBar: MatSnackBar) {
  }

  displayedColumns: string[] = ['picture', 'name', 'color', 'teams', 'action'];
  
  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamMemberService.getAllWithTeamNames().subscribe((data) => {
      this.dataSource = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      width: '600px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamMemberService.create(result).then(() => {
          
          this.teamAssociationService.createMultiple(result.associations).then(() => {
            this.loadTeams();
          });

          this.snackBar.open('Team member added successfully!', 'Close', { duration: 3000 });
        });
      }
    });
  }

  delete(id: string) {
    this.teamMemberService.delete(id).then(() => {
      this.snackBar.open('Team member deleted successfully!', 'Close', { duration: 3000 });
    });
  }

  edit(teamMember: TeamMember) {
    const dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      width: '600px',
      data: { teamMember, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamMemberService.update(teamMember.id!, result.data).then(() => {

          this.teamAssociationService.replaceMultipleByUser(result.data.id, result.associations).then(() => {
            this.loadTeams();
          });
          
          this.snackBar.open('Team member updated successfully!', 'Close', { duration: 3000 });
        });
      }
    });
  }

}
