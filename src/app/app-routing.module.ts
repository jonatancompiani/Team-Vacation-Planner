import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearTableComponent } from './year-table/year-table.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
      { path: '',       component: YearTableComponent },
      { path: 'members',  component: TeamMembersComponent },
      { path: 'teams',  component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
