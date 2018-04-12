import { Component, OnInit, Input } from '@angular/core';
import { AthletesService } from '../../service/athletes.service';
import { FormControl, Validators } from '@angular/forms';
import Athlete from '../../models/athlete';

@Component({
  selector: 'app-athlete-detail',
  templateUrl: './athlete-detail.component.html',
  styleUrls: ['./athlete-detail.component.css']
})
export class AthleteDetailComponent implements OnInit {

  fullName: String;
  ssn: String;
  club: String;

  @Input() athlete: Athlete;

  constructor() { }

  ngOnInit() {
  }

}
