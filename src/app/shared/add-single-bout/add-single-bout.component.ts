import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AthletesService } from '../../service/athletes.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import Bout from '../../models/bout';
import Athlete from '../../models/athlete';
import Club from '../../models/club';

@Component({
  selector: 'app-add-single-bout',
  templateUrl: './add-single-bout.component.html',
  styleUrls: ['./add-single-bout.component.css']
})
export class AddSingleBoutComponent implements OnInit {

  clubs: Array<Club>;
  athletes: Array<Athlete>;
  filteredAthletes: Observable<Athlete[]>;

  // Diploma bouts are declared in three types, A, B & C.
  types: Array<String> = ['A', 'B', 'C'];
  // Create an array of numbers from 9 to 45 which represent the points an athlete can get.
  points = Array.from(new Array(37), (val, index) => index+9);

  // We need a formDirective to reset the errors on submit, resetting the form group will not reset errors.
  @ViewChild('formDirective') formDirective;
  // Bout form
  boutForm: FormGroup;
  dateControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [
    Validators.required, 
    Validators.maxLength(1), 
    Validators.minLength(1)
  ]);
  opponentControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(5)
  ]);
  clubControl = new FormControl('', [Validators.required]);
  pointsControl = new FormControl('', [
    Validators.required, 
    Validators.min(9), 
    Validators.max(45)
  ]);
  organizerControl = new FormControl('', [Validators.required])

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
    this.fillOpponentArrayWithAthletes();
    this.fillClubsArray();
  }

  fillOpponentArrayWithAthletes() {
    this.athleteService.getAthletes().subscribe( athletes => {
      this.athletes = athletes;
      this.initiateFilteredAthletes();
    }, error => {
      // TODO: Make the user aware of that there is a problem with the bout form.
      console.log('error in fillOpponentArrayWithAthletes() :', error);
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

  fillClubsArray() {
    this.athleteService.getClubs().subscribe( clubs => {
      this.clubs = clubs;
    
    }, error => {
      // TODO: Make the user aware of that there is a problem with the bout form.
      console.log('error in fillClubsArray() :', error);
    })
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
    // this.formDirective.resetForm();
    this.boutForm.reset();
  }
}
