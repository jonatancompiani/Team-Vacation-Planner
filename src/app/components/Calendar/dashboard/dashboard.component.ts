import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { TeamService } from 'src/app/services/team.service';
import { TeamAssociationService } from 'src/app/services/teamAssociations.service';

export interface DashTeamModel {
  id?: string;
  name: string;
  description: string;
  holidayCalendar: string;
  userCount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    CommonModule,
  ],
})
export class DashboardComponent {

  teams: DashTeamModel[] = [];

  constructor(
    private teamService: TeamService,
    private teamAssocService: TeamAssociationService,
  ) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data) => {
      const teamsWithUserCount = data.map(async (team) => {
        const userCount = await this.teamAssocService.getCountById(team.id!);

        return {
          ...team,
          userCount: userCount
        };
      });
  
      Promise.all(teamsWithUserCount).then(teams => {
        this.teams = teams;
      });
    });
  }

}
