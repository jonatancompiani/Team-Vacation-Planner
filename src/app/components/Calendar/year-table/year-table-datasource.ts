import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Injectable } from '@angular/core';
import { TeamMember } from 'src/app/models/TeamMember';
import { Holiday } from 'src/app/models/Holiday';
import { HolidayService } from 'src/app/services/holiday.service';
import { TeamMemberService } from 'src/app/services/teamMember.service';
import { TeamAssociationService } from 'src/app/services/teamAssociations.service';
import { forkJoin, mergeMap, take } from 'rxjs';



export interface YearTableItem {
  id: number;
  month: string;
  sun1: DayData | undefined;
  mon1: DayData | undefined;
  tue1: DayData | undefined;
  wed1: DayData | undefined;
  thu1: DayData | undefined;
  fri1: DayData | undefined;
  sat1: DayData | undefined;
  sun2: DayData | undefined;
  mon2: DayData | undefined;
  tue2: DayData | undefined;
  wed2: DayData | undefined;
  thu2: DayData | undefined;
  fri2: DayData | undefined;
  sat2: DayData | undefined;
  sun3: DayData | undefined;
  mon3: DayData | undefined;
  tue3: DayData | undefined;
  wed3: DayData | undefined;
  thu3: DayData | undefined;
  fri3: DayData | undefined;
  sat3: DayData | undefined;
  sun4: DayData | undefined;
  mon4: DayData | undefined;
  tue4: DayData | undefined;
  wed4: DayData | undefined;
  thu4: DayData | undefined;
  fri4: DayData | undefined;
  sat4: DayData | undefined;
  sun5: DayData | undefined;
  mon5: DayData | undefined;
  tue5: DayData | undefined;
  wed5: DayData | undefined;
  thu5: DayData | undefined;
  fri5: DayData | undefined;
  sat5: DayData | undefined;
  sun6: DayData | undefined;
  mon6: DayData | undefined;
}

export interface DayData {
  displayText: string;
  date: Date;
  holiday: string | undefined,
  vacationingMembers: TeamMember[] | undefined
}

const MONTHS: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Injectable({
  providedIn: 'root'
})
export class YearTableDataSource {
  selectedYear: number = 0;
  monthsData: YearTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  holidays: Holiday[] = [];
  teamMembers: TeamMember[] = [];
  selectedMemberColor: string = "transparent";
  selectedMember: TeamMember | undefined;
  selectedMemberId: string | undefined;

  constructor
    (
      private holidayService: HolidayService,
      private teamMemberService: TeamMemberService,
      private teamAssociationService: TeamAssociationService
    ) {

    this.selectedYear = new Date().getFullYear();

    this.holidayService.getAll().subscribe(data => {
      this.holidays = data;
      this.fillTable()
    });

    this.generateTable();
  }

  async loadTeamData(teamId: string) {

    this.teamMembers = [];

    this.teamAssociationService.getByTeamId(teamId).pipe(
      mergeMap(data => {
        const requests = data.map(teamAssoc =>
          this.teamMemberService.getById(teamAssoc.userId!).pipe(
            take(1) // Ensure completion
          )
        );
        return forkJoin(requests);
      })
    ).subscribe({
      next: (members: (TeamMember | undefined)[]) => {
    
        this.teamMembers = members.filter((member): member is TeamMember => !!member);
    
        this.fillTable();
      },
      error: err => {
        console.error('Error fetching team members:', err);
      }
    });
  }

  selectMember(member?: TeamMember) {
    this.selectedMember = member;
    this.selectedMemberId = member?.id;
    this.fillTable();
  }

  generateTable() {

    this.monthsData = [];

    var propNames: string[] = this.getPropertyNames();

    var firstDayOfYear = new Date(this.selectedYear, 0, 1);
    var lastDayOfYear = new Date(this.selectedYear, 11, 31);

    var monthToAdd: YearTableItem | undefined;
    var propIndex: number = 0.
    for (var d = firstDayOfYear; d <= lastDayOfYear; d.setDate(d.getDate() + 1)) {
      if (d.getDate() == 1) {

        // creates an empty month (row)
        monthToAdd = { id: d.getMonth(), month: MONTHS[d.getMonth()], sun1: undefined, mon1: undefined, tue1: undefined, wed1: undefined, thu1: undefined, fri1: undefined, sat1: undefined, sun2: undefined, mon2: undefined, tue2: undefined, wed2: undefined, thu2: undefined, fri2: undefined, sat2: undefined, sun3: undefined, mon3: undefined, tue3: undefined, wed3: undefined, thu3: undefined, fri3: undefined, sat3: undefined, sun4: undefined, mon4: undefined, tue4: undefined, wed4: undefined, thu4: undefined, fri4: undefined, sat4: undefined, sun5: undefined, mon5: undefined, tue5: undefined, wed5: undefined, thu5: undefined, fri5: undefined, sat5: undefined, sun6: undefined, mon6: undefined };

        // sets the property index to allocate the 1st of the month on correct weekday (column)
        propIndex = propNames.indexOf(this.getPropFromDayOfWeek(d));
      }

      // get the property (column) name
      var propName = propNames[propIndex++];

      if (!monthToAdd) continue; // will never hit, here just for the interpreter

      var dayData: DayData =
      {
        date: new Date(d),
        displayText: d.getDate().toString(),
        holiday: undefined,
        vacationingMembers: undefined
      }

      // sets the day (cell) value
      monthToAdd[propName as keyof YearTableItem] = dayData as never;

      // on last day of month (row), adds it to the year table
      if (this.isLastDayOfMonth(d)) {
        this.monthsData.push(monthToAdd);
      }
    }
  }

  fillTable() {
    var propNames: string[] = this.getPropertyNames();

    propNames.forEach((prop) => {
      this.monthsData.forEach((mon: YearTableItem) => {
        var propValue = mon[prop as keyof YearTableItem];
        if (typeof propValue == "object") {
          var value = this.getHoliday(propValue.date);
          (mon[prop as keyof YearTableItem] as DayData).holiday = value;
          (mon[prop as keyof YearTableItem] as DayData).vacationingMembers = this.getVacationingTeamMembers(propValue.date, this.selectedMember);
        }
      });
    });
  }

  getVacationingTeamMembers(date: Date, memberFilter?: TeamMember): TeamMember[] | undefined {
    return this.teamMembers?.filter((member) => (!memberFilter || member.id == memberFilter?.id)
      && member.vacations?.filter((vacation: any) => this.areDatesEqual(vacation.toDate(), date)).length > 0);
  }

  toggleVacation(dbId: string, date: Date, member: TeamMember) {
    member.vacations = member.vacations ?? [];
    var existingVacations = member.vacations.filter((d: any) => this.areDatesEqual(d, date))
    if (existingVacations.length == 0)
      member.vacations.push(date);
    else
      member.vacations.splice(member.vacations.indexOf(existingVacations[0]), 1);

    this.teamMemberService.update(dbId, member);
  }

  private getHoliday(date: Date): string | undefined {
    var filteredHolidays = this.holidays.filter((h) => this.areDatesEqual(h.date, date));
    return filteredHolidays.length > 0 ? " ☼ " + filteredHolidays[0].description : undefined
  }

  private isLastDayOfMonth(date: Date): boolean {
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return date.getDate() == lastDayOfMonth;
  }

  private getPropertyNames(): string[] {
    const instance: YearTableItem = { id: 0, month: "", sun1: undefined, mon1: undefined, tue1: undefined, wed1: undefined, thu1: undefined, fri1: undefined, sat1: undefined, sun2: undefined, mon2: undefined, tue2: undefined, wed2: undefined, thu2: undefined, fri2: undefined, sat2: undefined, sun3: undefined, mon3: undefined, tue3: undefined, wed3: undefined, thu3: undefined, fri3: undefined, sat3: undefined, sun4: undefined, mon4: undefined, tue4: undefined, wed4: undefined, thu4: undefined, fri4: undefined, sat4: undefined, sun5: undefined, mon5: undefined, tue5: undefined, wed5: undefined, thu5: undefined, fri5: undefined, sat5: undefined, sun6: undefined, mon6: undefined };
    return Object.getOwnPropertyNames(instance);
  }

  private getPropFromDayOfWeek(date: Date): keyof YearTableItem {

    var propNames = ["sun1", "mon1", "tue1", "wed1", "thu1", "fri1", "sat1"];

    return propNames[date.getDay()] as keyof YearTableItem;
  }

  private areDatesEqual(date1: any, date2: Date): boolean {
    // for some reason, sometimes the date1 is not a Date object, but a Timestamp object
    try {
      return date1?.getFullYear() == date2?.getFullYear()
        && date1?.getMonth() == date2?.getMonth()
        && date1?.getDate() == date2?.getDate();
    } catch {
      return date1?.toDate()?.getFullYear() == date2?.getFullYear()
        && date1?.toDate()?.getMonth() == date2?.getMonth()
        && date1?.toDate()?.getDate() == date2?.getDate();
    }
  }
}
