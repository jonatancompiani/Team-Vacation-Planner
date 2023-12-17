import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DayData, MainTableDataSource, MainTableItem } from './main-table-datasource';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<MainTableItem>;
  dataSource: MainTableDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'month', 'sun1', 'mon1', 'tue1', 'wed1', 'thu1', 'fri1', 'sat1', 
    'sun2', 'mon2', 'tue2', 'wed2', 'thu2', 'fri2', 'sat2', 
    'sun3', 'mon3', 'tue3', 'wed3', 'thu3', 'fri3', 'sat3', 
    'sun4', 'mon4', 'tue4', 'wed4', 'thu4', 'fri4', 'sat4',
    'sun5', 'mon5', 'tue5', 'wed5', 'thu5', 'fri5', 'sat5', 
    'sun6', 'mon6'
  ];

  constructor(private ds: MainTableDataSource) {
    this.dataSource = ds;
  }

  ngAfterViewInit(): void {
  }

  getCellClasses(day: DayData): string {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var result = day?.displayText ? "validday" : "filler";
    result += day?.holiday ? " holiday" : "";
    result += day?.date.getTime() == today.getTime() ? " today" : "";
    result += day?.date.getTime() < today.getTime() ? " pastdate" : "";

    return result;
  }

  getTooltip(day: DayData): string {
    var result = day?.holiday ?? "";

    if (day?.vacationingMembers) {
      for (var d = 0; d < day.vacationingMembers?.length; d++) {
        result += " ■ " + day.vacationingMembers[d].name + " on vacation" 
      }
    }
    return result;
  }

  getBackgroundColor(members: any[]): string {
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

  getMemberBackground(member: any)
  {
    if(!this.dataSource.selectedMember || member.code == this.dataSource.selectedMember.code)
    {
      return member.color;
    }
    
    return '#FAFAFA';
  }

  selectTeamMember(member: any, id: string) {

    this.dataSource.selectedMemberColor = this.dataSource.selectedMemberColor == member.color ? "transparent" : member.color

    if (this.dataSource.selectedMember?.code == member.code) {
      this.dataSource.selectMember(undefined);
    } else {
      this.dataSource.selectMember(member);
    }
  }

  gen(){ this.dataSource.generateTable(); }
  fill(){ this.dataSource.fillTable(); }

  toggleEvent(day: DayData) {
    // only allow modificartion if a team member is selected
    if(!!this.dataSource.selectedMember && !!this.dataSource.selectedMemberId){

      this.ds.toggleVacation(this.dataSource.selectedMemberId, day.date, this.dataSource.selectedMember);
    }
  }
}
