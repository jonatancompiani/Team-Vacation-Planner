import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainTableDataSource, MainTableItem } from './main-table-datasource';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MainTableItem>;
  dataSource: MainTableDataSource;

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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
