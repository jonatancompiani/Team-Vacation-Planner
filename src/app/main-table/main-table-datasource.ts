import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface MainTableItem {
  id: number;
  month: string;
  sun1: string | undefined;
  mon1: string | undefined;
  tue1: string | undefined;
  wed1: string | undefined;
  thu1: string | undefined;
  fri1: string | undefined;
  sat1: string | undefined;
  sun2: string | undefined;
  mon2: string | undefined;
  tue2: string | undefined;
  wed2: string | undefined;
  thu2: string | undefined;
  fri2: string | undefined;
  sat2: string | undefined;
  sun3: string | undefined;
  mon3: string | undefined;
  tue3: string | undefined;
  wed3: string | undefined;
  thu3: string | undefined;
  fri3: string | undefined;
  sat3: string | undefined;
  sun4: string | undefined;
  mon4: string | undefined;
  tue4: string | undefined;
  wed4: string | undefined;
  thu4: string | undefined;
  fri4: string | undefined;
  sat4: string | undefined;
  sun5: string | undefined;
  mon5: string | undefined;
  tue5: string | undefined;
  wed5: string | undefined;
  thu5: string | undefined;
  fri5: string | undefined;
  sat5: string | undefined;
  sun6: string | undefined;
  mon6: string | undefined;
}

const MONTHS: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Data source for the MainTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MainTableDataSource extends DataSource<MainTableItem> {
  data: MainTableItem[] | undefined;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
 
  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MainTableItem[]> {
    return merge(observableOf(this.data))
      .pipe(map(() => {
        return this.getDates();
      }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }


  private getDates() {
    var data: MainTableItem[] = [];
    var propNames: string[] = this.getPropertyNames();

    var currentYear = new Date().getFullYear();
    var firstDayOfYear = new Date(currentYear, 0, 1);
    var lastDayOfYear = new Date(currentYear, 11, 31);

    var monthToAdd: MainTableItem | undefined;
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

      // sets the day (cell) value
      monthToAdd[propName as keyof MainTableItem] = d.getDate() as never;

      // on last day of month (row), adds it to the main table
      if (this.isLastDayOfMonth(d)) {
        data.push(monthToAdd);
      }
    }

    return data;
  }

  private isLastDayOfMonth(date: Date): boolean {
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return date.getDate() == lastDayOfMonth;
  }

  private getPropertyNames(): string[] {
    const instance: MainTableItem = { id: 0, month: "", sun1: undefined, mon1: undefined, tue1: undefined, wed1: undefined, thu1: undefined, fri1: undefined, sat1: undefined, sun2: undefined, mon2: undefined, tue2: undefined, wed2: undefined, thu2: undefined, fri2: undefined, sat2: undefined, sun3: undefined, mon3: undefined, tue3: undefined, wed3: undefined, thu3: undefined, fri3: undefined, sat3: undefined, sun4: undefined, mon4: undefined, tue4: undefined, wed4: undefined, thu4: undefined, fri4: undefined, sat4: undefined, sun5: undefined, mon5: undefined, tue5: undefined, wed5: undefined, thu5: undefined, fri5: undefined, sat5: undefined, sun6: undefined, mon6: undefined };
    return Object.getOwnPropertyNames(instance);
  }

  private getPropFromDayOfWeek(date: Date): keyof MainTableItem {

    var propNames = ["sun1", "mon1", "tue1", "wed1", "thu1", "fri1", "sat1"];

    return propNames[date.getDay()] as keyof MainTableItem;
  }

}
