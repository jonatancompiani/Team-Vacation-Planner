import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Team, TeamService } from 'src/app/services/team.service';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass'],
  standalone: false
})
export class TeamComponent implements OnInit {
  teams: Team[] = [];

  constructor(
    private teamService: TeamService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '400px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.addTeam(result).then(() => {
          this.snackBar.open('Team added successfully!', 'Close', { duration: 3000 });
        });
      }
    });
  }

  deleteTeam(id: string) {
    this.teamService.deleteTeam(id).then(() => {
      this.snackBar.open('Team deleted successfully!', 'Close', { duration: 3000 });
    });
  }

  editTeam(team: Team) {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '400px',
      data: { team, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.updateTeam(team.id!, result).then(() => {
          this.snackBar.open('Team updated successfully!', 'Close', { duration: 3000 });
        });
      }
    });
  }
}
