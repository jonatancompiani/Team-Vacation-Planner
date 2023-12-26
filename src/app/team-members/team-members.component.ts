import { Component } from '@angular/core';
import { TeamMemberDialogComponent } from '../team-member-dialog/team-member-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TeamMember } from '../models/TeamMember';
import { TeamMemberService } from '../services/teamMember.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.sass']
})
export class TeamMembersComponent {

  dataSource: TeamMember[] = [];

  constructor(
    public dialog: MatDialog, 
    private teamMemberService: TeamMemberService,
    private _snackBar: MatSnackBar) {
    this.teamMemberService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  displayedColumns: string[] = ['code', 'color', 'name', 'pictureUrl', 'action'];

  openDialog() {
    this.dialog.open(TeamMemberDialogComponent);
  }

  delete() {
    this._snackBar.open("Item Removed");
  }

}
