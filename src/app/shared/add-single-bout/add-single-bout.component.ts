import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AthletesService } from '../../service/athletes.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
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
  @Input() athlete: Athlete;
  @Output() newBout = new EventEmitter();
  // ------------------------------------------------------------
  athletes: Array<Athlete>;
  filteredAthletes: Observable<Athlete[]>;
  clubs: Array<Club>;
  filteredOpponentClubs: Observable<Club[]>;
  filteredOrganizerClubs: Observable<Club[]>;
  // ------------------------------------------------------------
  // Diploma bouts are declared in three types, A, B & C.
  types: Array<String> = ['A', 'B', 'C'];
  // Create an array of numbers from 9 to 45 which represent the points an athlete can get.
  points = Array.from(new Array(37), (val, index) => index+9);

  // ------------------------------------------------------------
  // We need a formDirective to reset the errors on submit, 
  // resetting only the form group will not reset errors.
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
  // ------------------------------------------------------------
  constructor(
    private athleteService: AthletesService,
    fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.boutForm = fb.group({
      'date': this.dateControl,
      'type': this.typeControl,
      'opponent': this.opponentControl,
      'club': this.clubControl,
      'points': this.pointsControl,
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
        map(value => typeof value === 'string' ? value : value === null ? '' : value.name),
        map(name => name ? this.filterAthletes(name) : this.athletes.slice())
      );
  }

  fillClubsArray() {
    this.athleteService.getClubs().subscribe( clubs => {
      this.clubs = clubs;
      this.initiateFilteredOpponentClub();
      this.initiateFilteredOrganizerClub();
    }, error => {
      // TODO: Make the user aware of that there is a problem with the bout form.
      console.log('error in fillClubsArray() :', error);
    })
  }

  initiateFilteredOpponentClub() {
    this.filteredOpponentClubs = this.clubControl.valueChanges
      .pipe(
        startWith<string | Club>(''),
        map(value => typeof value === 'string' ? value : value === null ? '' : value.name),
        map(name => name ? this.filterClubs(name) : this.clubs.slice())
      );
  }

  initiateFilteredOrganizerClub() {
    this.filteredOrganizerClubs = this.organizerControl.valueChanges
      .pipe(
        startWith<string | Club>(''),
        map(value => typeof value === 'string' ? value : value === null ? '' : value.name),
        map(name => name ? this.filterClubs(name) : this.clubs.slice())
      );
  }

  filterAthletes(name: string): Athlete[] {
    return this.athletes.filter(athlete =>
      athlete.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterClubs(name: string): Club[] {
    return this.clubs.filter( club => 
      club.name.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      club.shorthand.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayOpponent(opponent?: Athlete): string | undefined {
    return opponent ? `${opponent.name}` : undefined;
  }

  displayClub(club?: Club): string | undefined {
    return club ? `${club.shorthand}` : undefined;
  }

  onSubmit() {
    if(this.boutForm.valid) {
      const formValues = this.boutForm.value;
      const boutParams = {
        date: formValues.date,
        type: formValues.type, 
        opponent: formValues.opponent._id, 
        club: formValues.club.shorthand,
        points: formValues.points, 
        eventOrganizer: formValues.organizer.shorthand
      }

      this.athleteService.addBoutToAthlete( this.athlete._id, boutParams)
        .subscribe( bout => {
          this.formDirective.resetForm();
          this.newBout.emit(bout);
          this.snackBar.open('Bout added successfully','x', {
            duration: 3000
          });
          // TODO: snackbar with success message.
        }, error => {
          // TODO: Let user know that there was an error saving bout
          console.log('Error posting new bout:', error);
        });
    }
  }
}
