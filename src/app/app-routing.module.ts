import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearTableComponent } from './year-table/year-table.component';
import { TeamMembersComponent } from './team-members/team-members.component';

const routes: Routes = [
      { path: '',       component: YearTableComponent },
      { path: 'teams',  component: TeamMembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
