import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AthletesService } from '../../service/athletes.service';
import { MatTableDataSource , MatSort} from '@angular/material';
import Athlete from '../../models/athlete';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css']
})
export class AthleteListComponent implements OnInit {

  //athletes: Athlete[] = [];
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'ssn', 'club', 'diploma', 'achievements'];

  @ViewChild(MatSort) sort: MatSort;
  @Output() selectedRow = new EventEmitter<Athlete>();

  constructor(private _athleteService: AthletesService) { }

  ngOnInit() {
    this._athleteService.getAthletes().subscribe(result => {
      this.dataSource.data = result
      console.log(result);
    });
  }

  ngAfterViewInit() {
    console.log('sort: ', this.sort);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectAthlete(athlete) {
    this.selectedRow.emit(athlete);
  }


}
