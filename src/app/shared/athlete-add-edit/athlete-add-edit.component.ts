import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { SsnValidator, formatSsn } from '../../_validators/ssn.validator';
import { AthletesService } from '../../_services/athletes.service';
import { NewAthlete as Athlete } from '../../_models/athlete';
import Club from '../../_models/club';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-athlete-add-edit',
  templateUrl: './athlete-add-edit.component.html',
  styleUrls: ['./athlete-add-edit.component.css']
})
export class AthleteAddEditComponent implements OnInit {
  private isNewAthlete = true;
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
    private fb: FormBuilder,
    public snackBar: MatSnackBar
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
        this.checkIfEditAthlete();
      },
      error => {
        this.snackBar.open(
          'Error fetching available clubs, please reopen dialog.',
          'X',
          { duration: 4000 }
        );
      }
    );
  }

  initiateFilteredClub() {
    this.filteredClubs = this.clubControl.valueChanges.pipe(
      startWith<string | Club>(''),
      map(value =>
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

  checkIfEditAthlete() {
    if (this.data && this.data.athlete) {
      this.isNewAthlete = false;
      this.athlete = this.data.athlete;
      this.nameControl.setValue(this.data.athlete.name);
      this.ssnControl.setValue(this.data.athlete.ssn);
      this.clubControl.setValue(
        this.clubs.filter(c => c.shorthand === this.data.athlete.club)[0]
      );
    } else {
      this.athlete = {
        name: '',
        ssn: '',
        club: ''
      };
    }
  }

  onSave() {
    if (!this.athleteFormGroup.valid) {
      return;
    }

    const saveFn = this.isNewAthlete
      ? data => this.athletesService.addAthlete(data)
      : data => this.athletesService.editAthlete(data);

    const formValues = this.athleteFormGroup.value;
    this.athlete.name = formValues.name;
    this.athlete.ssn = formatSsn(formValues.ssn);
    this.athlete.club = formValues.club.shorthand;

    saveFn(this.athlete).subscribe(
      newAthlete => {
        this.dialogRef.close({ athlete: newAthlete });
      },
      error => {
        this.snackBar.open(`Unable to save, ${error}.`, 'X', {
          duration: 5000
        });
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
