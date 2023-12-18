import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearTableComponent } from './year-table/year-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: YearTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
