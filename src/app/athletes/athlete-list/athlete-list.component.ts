import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { AthletesService } from '../../_services/athletes.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import Athlete from '../../_models/athlete';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css']
})
export class AthleteListComponent implements OnInit {
  athletes: Athlete[];
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'ssn', 'club', 'diploma', 'achievements'];
  filterInput: String;

  @ViewChild(MatSort)
  sort: MatSort;
  @Output()
  selectedRow = new EventEmitter<Athlete>();

  constructor(private _athleteService: AthletesService) {}

  ngOnInit() {
    this._athleteService.getAthletes().subscribe(result => {
      this._athleteService.athleteList.subscribe(athletes => {
        this.dataSource.data = athletes;
        console.log('Got a new athletes emit in athlete-list.component');
      });
      console.log(result);
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
