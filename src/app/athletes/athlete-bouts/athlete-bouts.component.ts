import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AthletesService } from '../../_services/athletes.service';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import Bout from '../../_models/bout';
import Athlete from '../../_models/athlete';


@Component({
  selector: 'app-athlete-bouts',
  templateUrl: './athlete-bouts.component.html',
  styleUrls: ['./athlete-bouts.component.css']
})
export class AthleteBoutsComponent implements OnInit {

  // Bout history
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['date','type','opponent','club','points','eventOrganizer'];

  @Input() bouts: Bout[];
  @Input() athlete: Athlete;

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.bouts;
  }

  newBout(bout: Bout) {
    console.log('We got an event: ', bout);
    this.dataSource.data = [...this.dataSource.data, bout];
  }

}
