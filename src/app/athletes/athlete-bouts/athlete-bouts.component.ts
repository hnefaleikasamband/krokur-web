import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AthletesService } from '../../service/athletes.service';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import Bout from '../../models/bout';
import Athlete from '../../models/athlete';


@Component({
  selector: 'app-athlete-bouts',
  templateUrl: './athlete-bouts.component.html',
  styleUrls: ['./athlete-bouts.component.css']
})
export class AthleteBoutsComponent implements OnInit {

  // FIXME: Fetch clubs from backend
  clubs: Array<any> = [
    { name: 'Hnefaleikafélag Hafnarfjarðar', shortName: 'TC1'},
    { name: 'Hnefaleikafélag Reykjavíkur', shortName: 'TC2'},
    { name: 'Hnefaleikafélagið Æsir ', shortName: 'TC3'},
    { name: 'Hnefaleikafélag Reykjaness', shortName: 'TC4'}
  ];

  athletes: Athlete[];
  filteredAthletes: Observable<Athlete[]>;

  types: Array<String> = ['A', 'B', 'C'];
  // Create an array of numbers from 9 to 45 which represent the points an athlete can get.
  points = Array.from(new Array(37), (val, index) => index+9);

  // We need a formDirective to reset the errors on submit, resetting the form group will not reset errors.
  @ViewChild('formDirective') formDirective;
  // Bout form
  boutForm: FormGroup;
  dateControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]);
  opponentControl = new FormControl('', [Validators.required, Validators.minLength(5),]);
  clubControl = new FormControl('', [Validators.required]);
  pointsControl = new FormControl('', [Validators.required, Validators.min(9), Validators.max(45)]);
  organizerControl = new FormControl('', [Validators.required]);

  // Bout history
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['date','type','opponent','club','points','eventOrganizer'];

  @Input() bouts: Bout[];

  constructor(
    private athleteService: AthletesService,
    fb: FormBuilder
  ) {
    this.boutForm = fb.group({
      'date': this.dateControl,
      'type': this.typeControl,
      'opponent': this.opponentControl,
      'club': this.clubControl,
      'organizer': this.organizerControl
    });
   }

  ngOnInit() {
    this.dataSource.data = this.bouts;
    this.setAthletesInOpponentArray();

  }

  setAthletesInOpponentArray() {
    this.athleteService.getAthletes().subscribe( athletes => {
      this.athletes = athletes;
      this.initiateFilteredAthletes();
    }, error => {
      // TODO: Make the user aware of that there is a problem with the bout form.
    })
  }

  initiateFilteredAthletes() {
    this.filteredAthletes = this.opponentControl.valueChanges
      .pipe(
        startWith<string | Athlete>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.athletes.slice())
      );
  }

  filter(name: string): Athlete[] {
    return this.athletes.filter(athlete =>
      athlete.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(opponent?: Athlete): string | undefined {
    return opponent ? opponent.name : undefined;
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.boutForm);
    //console.log('Form values --\n', this.boutForm.value);
    this.boutForm.reset();
    this.formDirective.resetForm();
  }

}
