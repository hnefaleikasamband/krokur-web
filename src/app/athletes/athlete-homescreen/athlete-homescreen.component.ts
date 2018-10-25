import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AthleteAddEditComponent } from '../../shared/athlete-add-edit/athlete-add-edit.component';

/* Services & models */
import { Athlete, AthleteTab } from '../../_models/athlete';
import authedUser from '../../_models/authedUser';
import { AthletesService } from '../../_services/athletes.service';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-athlete-homescreen',
  templateUrl: './athlete-homescreen.component.html',
  styleUrls: ['./athlete-homescreen.component.css']
})
export class AthleteHomescreenComponent implements OnInit {
  openAthletesTab: AthleteTab[] = [];
  selectedTabIndex = 0;
  athletes: Athlete[] = [];

  constructor(
    private athletesService: AthletesService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.athletesService.getAthletes().subscribe();
    this.athletesService.athleteList.subscribe(athletes => {
      this.athletes = athletes;
      console.log('Got a new athletes list emit in athlete-list.component');
      console.log('new athletes', athletes);
    });
  }

  selectAthlete(athlete) {
    const alreadyOpen = this.openAthletesTab.find(a => a._id === athlete._id);
    if (!alreadyOpen || alreadyOpen === undefined) {
      this.athletesService.getAthleteBouts(athlete._id).subscribe(response => {
        athlete.bouts = response;
        this.openAthletesTab.push(athlete);
        this.selectedTabIndex = this.openAthletesTab.indexOf(athlete) + 1;
      });
    } else {
      const openAthletesTabIndex = this.openAthletesTab.indexOf(alreadyOpen);
      this.selectedTabIndex = openAthletesTabIndex + 1;
      this.athletesService.getAthleteBouts(athlete._id).subscribe(response => {
        athlete.bouts = response;
        this.openAthletesTab[openAthletesTabIndex] = athlete;
      });
    }
  }

  removeTab(index) {
    this.openAthletesTab.splice(index, 1);
  }

  goToRoute(path: string) {
    console.log('the path: ', path);
    this.router.navigateByUrl('/' + path);
  }

  newButtonPushed(event) {
    const addDialogRef = this.dialog.open(AthleteAddEditComponent, {
      width: '30%',
      minWidth: 350
    });

    addDialogRef.afterClosed().subscribe(result => {
      console.log('Closing dialog:', result);
    });
  }
}
