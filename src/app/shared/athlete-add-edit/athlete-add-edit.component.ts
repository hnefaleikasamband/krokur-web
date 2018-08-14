import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Athlete } from '../../_models/athlete';

@Component({
  selector: 'app-athlete-add-edit',
  templateUrl: './athlete-add-edit.component.html',
  styleUrls: ['./athlete-add-edit.component.css']
})
export class AthleteAddEditComponent implements OnInit {
  athlete: Athlete;
  clubsAvailable: String[];

  constructor(
    public dialogRef: MatDialogRef<AthleteAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log('Data being injected: ', this.data);
    this.athlete = (this.data && this.data.athlete) ? this.data.athlete : { name: '', ssn: '', club: ''};
    // This is for input hinting
    this.clubsAvailable = (this.data && this.data.clubsAvailable) ? this.data.clubsAvailable : ['No clubs found'];

    console.log(this.athlete, this.clubsAvailable);
  }

  onSave() {
    // TODO: Validate input and send data back 
    console.log('im in the save function');
    this.dialogRef.close(this.athlete);
  }


}
