import {
  Component,
  OnInit,
  ViewChild,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import Athlete from '../../_models/athlete';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css']
})
export class AthleteListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'ssn', 'club', 'diploma', 'achievements'];
  filterInput: String;
  private _athletes = new BehaviorSubject<Athlete[]>([]);

  @ViewChild(MatSort)
  sort: MatSort;
  @Output()
  selectedRow = new EventEmitter<Athlete>();
  @Input()
  set athletes(value) {
    // set the latest value for _data BehaviorSubject
    this._athletes.next(value);
  }

  get athletes() {
    // get the latest value from _data BehaviorSubject
    return this._athletes.getValue();
  }

  constructor() {}

  ngOnInit() {
    this._athletes.subscribe(x => {
      this.dataSource.data = this._athletes.getValue();
    });
  }

  ngAfterViewInit() {
    console.log('sort: ', this.sort);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.filterInput = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectAthlete(athlete) {
    this.selectedRow.emit(athlete);
  }
}
