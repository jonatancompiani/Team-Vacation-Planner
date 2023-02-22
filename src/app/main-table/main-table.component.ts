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
  dataSource: MainTableDataSource;

  selectedMemberColor: string = "transparent";
  selectedMember: TeamMember | undefined;

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
  }

  ngAfterViewInit(): void {
  }

  getCellClasses(day: DayData): string {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var result = day?.displayText ? "validday" : "";
    result += day?.holiday ? " holiday" : "";
    result += day?.date.getTime() == today.getTime() ? " today" : "";
    result += day?.date.getTime() < today.getTime() ? " pastdate" : "";

    return result;
  }

  getTooltip(day: DayData): string {
    var result = day?.holiday ?? "";

    if (day?.vacationingMembers) {
      for (var d = 0; d < day.vacationingMembers?.length; d++) {
        result += " - " + day.vacationingMembers[d].name + " on vacation"
      }
    }
    return result;
  }

  getBackgroundColor(members: TeamMember[]): string {
    if (!members || members.length == 0)
      return ""

    if (members.length == 1) {
      return members[0].color
    }

    var startGrad = 0;
    var step = 100 / members.length;
    var gradient = "linear-gradient(45deg"
    for (var i = 0; i < members.length; i++) {
      gradient += ", " + members[i].color + " " + startGrad + "% " + (startGrad + step) + "% ";
      startGrad += step;
    }
    gradient += ")"

    return gradient;
  }

  selectTeamMember(member: TeamMember) {

    this.selectedMemberColor = this.selectedMemberColor == member.color ? "transparent" : member.color

    if (this.selectedMember?.id == member.id) {
      this.dataSource.selectMember(undefined);
      this.selectedMember = undefined;
    } else {
      this.dataSource.selectMember(member);
      this.selectedMember = member;
    }
  }

  toggleEvent(day: DayData) {
    if(!!this.selectedMember){

      var memberIndex = this.dataSource.teamMembers.findIndex(x=> x.id == this.selectedMember?.id);
      
      var vacationIndex = this.dataSource.teamMembers[memberIndex].vacations.findIndex(x=> x.getTime() == day.date.getTime())
      if(vacationIndex == -1)
      {
        this.dataSource.teamMembers[memberIndex].vacations.push(day.date);
      }
      else
      {
        this.dataSource.teamMembers[memberIndex].vacations.splice(vacationIndex, 1);
      }

      this.dataSource.selectMember(this.selectedMember);
    }
  }
}
