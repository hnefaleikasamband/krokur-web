import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NgSwitch } from '@angular/common';
import { AthleteAddEditComponent } from '../../shared/athlete-add-edit/athlete-add-edit.component';

/* Service & model imports */
import Athlete from '../../_models/athlete';
import Bout from '../../_models/bout';
import { AthletesService } from '../../_services/athletes.service';

@Component({
  selector: 'app-athlete-detail',
  templateUrl: './athlete-detail.component.html',
  styleUrls: ['./athlete-detail.component.css']
})
export class AthleteDetailComponent implements OnInit {

  @Input() athlete: Athlete;
  @Input() bouts: Bout[];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  editAthlete() {
    let editDialogRef = this.dialog.open(AthleteAddEditComponent, {
      width: '30%',
      data: {
        athlete: this.athlete
      }
    });
    
    editDialogRef.afterClosed().subscribe( result => {
      console.log('Closing dialog:',result);
    })
  }
}
