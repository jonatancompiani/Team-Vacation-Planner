import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Holiday, HolidayDataSource } from './holiday-datasource';
import { DayData, MainTableDataSource, MainTableItem } from './main-table-datasource';
import { TeamMember, TeamMemberDataSource } from './team-member-datasource';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<MainTableItem>;
  @ViewChild(MatTable) teamMembers!: TeamMember[] | undefined;
  @ViewChild(MatTable) holidays!: Holiday[] | undefined;
  dataSource: MainTableDataSource;
  teamMembersDataSource: TeamMemberDataSource;
  holidaysDataSource: HolidayDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'month',
    'sun1',
    'mon1',
    'tue1',
    'wed1',
    'thu1',
    'fri1',
    'sat1',
    'sun2',
    'mon2',
    'tue2',
    'wed2',
    'thu2',
    'fri2',
    'sat2',
    'sun3',
    'mon3',
    'tue3',
    'wed3',
    'thu3',
    'fri3',
    'sat3',
    'sun4',
    'mon4',
    'tue4',
    'wed4',
    'thu4',
    'fri4',
    'sat4',
    'sun5',
    'mon5',
    'tue5',
    'wed5',
    'thu5',
    'fri5',
    'sat5',
    'sun6',
    'mon6'
  ];

  constructor() {
    this.dataSource = new MainTableDataSource();
    this.teamMembersDataSource = new TeamMemberDataSource();
    this.holidaysDataSource = new HolidayDataSource();
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
    this.teamMembers = this.teamMembersDataSource.data;
    this.holidays = this.holidaysDataSource.data;
  }

  getCellClasses(day: DayData): string{
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var result = day?.displayText ? "validday" : "";
    result += day?.holiday ? " holiday" : "";
    result += day?.date.getTime() == today.getTime() ? " today" : "";
    result += day?.date.getTime() < today.getTime() ? " pastdate" : "";
    console.log(day?.date.toDateString());
    return result;
  }
}
