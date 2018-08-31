import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { SsnValidator, formatSsn } from '../../_validators/ssn.validator';
import { AthletesService } from '../../_services/athletes.service';
import Athlete from '../../_models/athlete';
import Club from '../../_models/club';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-athlete-add-edit',
  templateUrl: './athlete-add-edit.component.html',
  styleUrls: ['./athlete-add-edit.component.css']
})
export class AthleteAddEditComponent implements OnInit {
  private newAthlete = true;
  athlete: Athlete;
  clubs: Array<Club>;
  filteredClubs: Observable<Club[]>;

  @ViewChild('athleteForm')
  athleteFormDirective;
  athleteFormGroup: FormGroup;

  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  ssnControl = new FormControl('', [Validators.required, SsnValidator]);
  clubControl = new FormControl(
    '',
    [Validators.required],
    this.validateClub.bind(this)
  );

  constructor(
    public dialogRef: MatDialogRef<AthleteAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private athletesService: AthletesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fillClubsArray();
    this.athleteFormGroup = this.fb.group({
      name: this.nameControl,
      ssn: this.ssnControl,
      club: this.clubControl
    });
  }

  /**
   * Fetches the clubs available from the backend and then initates the
   * filter when we have data to filter by.
   */
  fillClubsArray() {
    this.athletesService.getClubs().subscribe(
      clubs => {
        this.clubs = clubs;
        this.initiateFilteredClub();
      },
      error => {
        // TODO: Make the user aware of that there is a problem with the bout form.
        console.log('error in fillClubsArray() :', error);
      }
    );
  }

  initiateFilteredClub() {
    this.filteredClubs = this.clubControl.valueChanges.pipe(
      startWith<string | Club>(''),
      map(
        value =>
          typeof value === 'string' ? value : value === null ? '' : value.name
      ),
      map(name => (name ? this.filterClubs(name) : this.clubs.slice()))
    );
  }

  /**
   * How the autocomplete filters the input from the user.
   */
  filterClubs(name: string): Club[] {
    return this.clubs.filter(
      club =>
        club.name.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
        club.shorthand.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  /**
   * How the value is represented in the input field after being selected
   * from the autocomplete list.
   * @param club
   */
  displayClub(club?: Club): string | undefined {
    return club ? `${club.name}` : undefined;
  }

  onSave() {
    if (!this.athleteFormGroup.valid) {
      return;
    }

    const formValues = this.athleteFormGroup.value;
    const athlete: Athlete = {
      name: formValues.name,
      ssn: formatSsn(formValues.ssn),
      club: formValues.club.shorthand
    };
    this.athletesService.addAthlete(athlete).subscribe(
      newAthlete => {
        console.log('New athlete', newAthlete);
        this.dialogRef.close({ athlete: newAthlete });
      },
      error => {
        console.log('Unable to add athlete:', error);
        console.log(error);
      }
    );
  }

  /**
   * "Async" validation function to check if a club has been selected.
   */
  validateClub(control: AbstractControl) {
    const found = this.clubs.filter(c => c === control.value);
    return found.length > 0
      ? Promise.resolve(null)
      : Promise.resolve({ clubvalidation: true });
  }
}
