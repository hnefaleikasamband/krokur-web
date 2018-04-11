import { Component, OnInit } from '@angular/core';
import { Athlete, AthletesService } from '../../service/athletes.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-athlete-detail',
  templateUrl: './athlete-detail.component.html',
  styleUrls: ['./athlete-detail.component.css']
})
export class AthleteDetailComponent implements OnInit {

  fullName: String;
  ssn: String;
  club: String;

  nameFormControl = new FormControl('', [ Validators.required]);
  ssnFormControl = new FormControl('', [Validators.required]);
  clubFormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

  getNameError() {
    return this.nameFormControl.hasError('required') ? 'You must enter a name ' : 'Error in errors :O';
  }

  getSsnError() {
    return this.ssnFormControl.hasError('required') ? 'You must enter a Social Security Number ' : 'Error in errors :O';
  }

  getClubError() {
    return this.clubFormControl.hasError('required') ? 'You must enter a club ' : 'Error in errors :O';
  }

}
