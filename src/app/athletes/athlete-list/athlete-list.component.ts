import { Component, OnInit, ViewChild } from '@angular/core';
import { Athlete, AthletesService } from '../../service/athletes.service';
import { MatTableDataSource , MatSort} from '@angular/material';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css']
})
export class AthleteListComponent implements OnInit {

  //athletes: Athlete[] = [];
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'kt', 'club', 'diploma', 'achievements'];

  @ViewChild(MatSort) sort: MatSort;

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

  addRow() {
    this.dataSource.data.push(this._athleteService.get()[0]);
    //this.athleteTable.renderRows();
  }

  alertMe(item) {
    console.log("Hello kids:", item);
  }


}
