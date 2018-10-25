import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AthletesService } from '../../_services/athletes.service';
import { MatTableDataSource } from '@angular/material';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
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
  columnsToDisplay = [
    'date',
    'type',
    'opponent',
    'club',
    'points',
    'eventOrganizer'
  ];

  @Input()
  bouts: Bout[];
  @Input()
  athlete: Athlete;

  constructor(private athletesService: AthletesService) {}

  ngOnInit() {
    this.dataSource.data = this.bouts;
    console.log('athlete in bout component:', this.athlete);
  }

  newBout(bout: Bout) {
    this.dataSource.data = [...this.dataSource.data, bout];
    this.athletesService.getAthlete(this.athlete._id).subscribe(athlete => {
      if (
        !this.checkForAchievement(
          this.athlete.achievements,
          athlete.achievements
        )
      ) {
        this.athlete.achievements = athlete.achievements;
        this.athletesService.getAthletes().subscribe();
      }
    });
  }

  checkForAchievement(
    oldObj: Athlete['achievements'],
    newObj: Athlete['achievements']
  ) {
    return (
      oldObj.diploma.date === newObj.diploma.date &&
      oldObj.bronz.date === newObj.bronz.date &&
      oldObj.silver.date === newObj.silver.date &&
      oldObj.gold.date === newObj.gold.date
    );
  }
}
