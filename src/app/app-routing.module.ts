import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './components/Team/team/team.component';
import { TeamMembersComponent } from './components/TeamMember/team-members/team-members.component';
import { YearTableComponent } from './components/Calendar/year-table/year-table.component';

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
